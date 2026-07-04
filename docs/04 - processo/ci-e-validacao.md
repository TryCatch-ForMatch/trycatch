# Documento de Processo --- CI e Validação de Pull Requests

**Classificação:** Documento de Processo\
**Camada:** 4 --- Processo\
**Status:** Fluxo oficial documentado

------------------------------------------------------------------------

## 1. Objetivo

Este documento explica o fluxo oficial de Integração Contínua (CI) e
validação de Pull Requests do TryCatch.

Ele deve ajudar novos contribuidores a entender:

-   O que é CI;
-   Quando a pipeline executa;
-   Quais validações são feitas automaticamente;
-   Como validar mudanças localmente antes de abrir PR;
-   Como agir quando algum check falhar;
-   Quais requisitos precisam estar atendidos antes do merge.

------------------------------------------------------------------------

## 2. Resumo rápido para contribuidores

Antes de abrir um Pull Request, siga este fluxo:

1.  Crie a branch a partir de `develop`.
2.  Faça a mudança mantendo o escopo da issue.
3.  Rode as validações locais:

```bash
npm run lint
npm run test
npm run test:push
npm run build
```

4.  Abra o PR com destino para `develop`.
5.  Inclua na descrição o que mudou, como foi validado e a issue
    relacionada.
6.  Se algum check falhar, corrija na mesma branch e envie novo commit.

Para mudanças apenas em documentação, rode pelo menos:

```bash
npm run lint
```

Se a mudança tocar código TypeScript, rotas, componentes, Prisma ou
dependências, rode o fluxo completo.

------------------------------------------------------------------------

## 3. O que é CI

CI, ou Integração Contínua, é o processo automatizado que executa
validações sempre que uma mudança é enviada para revisão.

No TryCatch, a CI protege a branch de desenvolvimento contra:

-   Código que não compila;
-   Regressão em testes;
-   Problemas de lint;
-   Queda de cobertura mínima;
-   Dependências com vulnerabilidades de alto risco;
-   Falhas de qualidade analisadas por ferramentas externas.

------------------------------------------------------------------------

## 4. Quando a pipeline roda

O projeto possui dois workflows que atuam em conjunto:

-   `.github/workflows/ci.yml` --- workflow principal (**CI Pipeline**);
-   `.github/workflows/sonarcloud.yml` --- análise de qualidade
    (**SonarCloud**), executada após a CI Pipeline.

O **CI Pipeline** roda em:

-   Pull Requests direcionados para `main`;
-   Pull Requests direcionados para `develop`;
-   Pushes diretos em `main`;
-   Pushes diretos em `develop`.

Para contribuições comuns, o fluxo esperado é abrir PR para `develop`.
Push direto em `main` ou `develop` deve ser reservado para mantenedores e
casos autorizados.

O **SonarCloud** não roda diretamente em `pull_request`. Ele é disparado
pelo gatilho `workflow_run`, ou seja, **somente depois que a CI Pipeline
termina com sucesso**. O motivo dessa separação está explicado na seção
4.5.

> **Importante:** workflows com gatilho `workflow_run` só são executados
> a partir da versão do arquivo que está na branch padrão do repositório
> (`develop`/`main`). Alterações nesse workflow feitas em uma branch de
> feature só passam a valer depois do merge.

------------------------------------------------------------------------

## 5. Validações executadas pela CI

### 5.1 Build and Prepare Environment

Objetivo: garantir que a aplicação consiga compilar em ambiente limpo.

Passos principais:

-   Faz checkout do repositório;
-   Configura Node.js 24;
-   Instala dependências com `npm ci`;
-   Cria arquivo `.env` com secrets configurados no GitHub;
-   Executa `npm run build`.

### 5.2 Lint Codebase

Objetivo: verificar padrões de código e regras do Next.js/ESLint.

Comando executado:

```bash
npm run lint
```

### 5.3 Run Tests (Jest)

Objetivo: garantir que os testes automatizados continuem passando.

Comando executado:

```bash
npm run test
```

### 5.4 Run Tests with Coverage

Objetivo: gerar cobertura de testes e impedir queda abaixo do mínimo
definido.

Comando executado na CI:

```bash
npx jest --coverage \
  --coverageThreshold='{"global":{"branches":60,"functions":60,"lines":60,"statements":60}}'
```

O relatório de cobertura é enviado como artefato do workflow
(`coverage-report`). Em Pull Requests, o job também publica um artefato
`pr-metadata` (número do PR, branch de origem e branch de destino). Esses
artefatos são consumidos pelo workflow SonarCloud (seção 5.5).

O padrão oficial de testes backend está documentado em
`docs/04 - processo/testes-backend.md`.

### 5.5 SonarCloud Scan (workflow separado)

Objetivo: executar análise de qualidade e segurança via SonarCloud.

#### Por que é um workflow separado

A análise do SonarCloud precisa do secret `SONAR_TOKEN` para se
autenticar no projeto. Por segurança, o GitHub **não disponibiliza
secrets para workflows disparados por `pull_request` quando o PR vem de
um fork**. Como a maioria das contribuições é feita a partir de forks, o
antigo job de Sonar dentro da CI Pipeline recebia um `SONAR_TOKEN` vazio
e falhava sempre com a mensagem:

```text
Not authorized or project not found. Please check the 'SONAR_TOKEN'...
```

Para resolver isso sem expor o token a código não confiável, a análise
foi movida para o workflow `sonarcloud.yml`, disparado por
`workflow_run`. Workflows `workflow_run` executam **no contexto do
repositório base**, e por isso têm acesso ao `SONAR_TOKEN` mesmo quando a
CI Pipeline original foi disparada por um fork.

#### Como o fluxo funciona

1.  A **CI Pipeline** roda no PR (inclusive de forks), sem secrets,
    compila, testa e gera cobertura. Ela publica os artefatos
    `coverage-report` e `pr-metadata`.
2.  Ao terminar com sucesso, ela dispara o workflow **SonarCloud**.
3.  O SonarCloud roda no contexto do repositório base (com
    `SONAR_TOKEN`), faz checkout exato do commit analisado, baixa os
    artefatos e executa **apenas o scanner**.

O scanner apenas **lê arquivos** --- ele não executa `npm ci`, build ou
qualquer script do projeto. Assim, o token nunca fica exposto ao código
do fork, evitando o risco de vazamento que existiria com a abordagem
`pull_request_target`.

#### De onde vem o `SONAR_TOKEN`

Ele **não é aleatório**: é um token gerado no SonarCloud e armazenado
como secret no repositório base.

-   Gere em SonarCloud → projeto → *Administration → Analysis Method*
    (token de análise do projeto) ou em *My Account → Security*;
-   Cadastre no **repositório base** (`TryCatch-ForMatch/trycatch`), em
    *Settings → Secrets and variables → Actions*, com o nome exato
    `SONAR_TOKEN`;
-   O token é um segredo: nunca deve ser commitado. Se vazar, revogue no
    SonarCloud e gere outro.

> Por rodar no contexto do repositório base, a análise do SonarCloud só
> aparece após o merge na branch padrão. Em PRs de fork, basta garantir
> que os demais checks estejam verdes; o Sonar passa a decorar o PR
> quando o `SONAR_TOKEN` está configurado no repositório base.

### 5.6 Audit Dependencies

Objetivo: bloquear dependências com vulnerabilidades de severidade alta
ou superior.

Comando executado:

```bash
npm audit --audit-level=high
```

------------------------------------------------------------------------

## 6. Validação local antes de abrir PR

Antes de abrir um Pull Request, o contribuidor deve rodar as validações
principais localmente.

Fluxo recomendado:

```bash
git checkout develop
git pull origin develop
npm ci
npm run lint
npm run test
npm run test:push
npm run build
```

Observações:

-   `npm run test:push` reproduz a validação executada pelo hook de
    pre-push;
-   `npm run build` exige variáveis de ambiente mínimas configuradas;
-   Se a mudança alterar Prisma ou dependências, rode também as
    validações específicas necessárias, como `npx prisma generate`;
-   Se a mudança alterar dependências, rode `npm audit --audit-level=high`.

------------------------------------------------------------------------

## 7. Requisitos para abrir Pull Request

Antes de abrir o PR:

-   A branch deve ter sido criada a partir de `develop`;
-   O PR deve ter como destino a branch `develop`;
-   A issue relacionada deve ser referenciada na descrição;
-   A descrição deve explicar objetivamente o que foi alterado;
-   Os comandos de validação local devem ser listados;
-   Arquivos `.env`, secrets, tokens e credenciais não devem ser
    commitados;
-   Alterações fora do escopo da issue devem ser evitadas.

Modelo mínimo de descrição:

```md
## Descrição

Resumo objetivo da mudança.

## Validação

- npm run lint
- npm run test
- npm run test:push
- npm run build

Refs: #numero-da-issue
```

Use `Fixes: #numero-da-issue` apenas quando o PR realmente concluir a
issue.

------------------------------------------------------------------------

## 8. O que fazer quando um check falhar

Quando a CI falhar:

1.  Abra o job que falhou no GitHub Actions.
2.  Leia a primeira mensagem de erro relevante.
3.  Reproduza localmente o comando equivalente.
4.  Corrija o problema na mesma branch.
5.  Rode novamente as validações locais.
6.  Envie novo commit para atualizar o PR.

Não é recomendado alterar o workflow apenas para contornar erro de
código, teste, lint ou build.

Se a falha for de ferramenta externa, como autorização do Vercel,
SonarQube ou secrets indisponíveis, registre a informação no PR e
aguarde orientação de um mantenedor.

------------------------------------------------------------------------

## 9. Requisitos para merge

Um PR só deve ser considerado pronto para merge quando:

-   A CI obrigatória estiver verde, ou a falha externa tiver sido
    validada por mantenedor;
-   O PR estiver sem conflitos com `develop`;
-   O escopo estiver alinhado com a issue;
-   Houver aprovação de revisão, quando aplicável;
-   A documentação estiver atualizada quando a mudança alterar fluxo,
    regra de negócio ou comportamento visível.

------------------------------------------------------------------------

## 10. Relação com Husky

O projeto usa Husky para validações locais antes de commits e pushes.

Hooks configurados:

-   `pre-commit`: executa `lint-staged`;
-   `commit-msg`: valida mensagens com Commitlint;
-   `pre-push`: executa `npm run test:push`.

Se um hook falhar, corrija o problema antes de enviar a mudança. O uso
de `--no-verify` deve ser excepcional e justificado, por exemplo quando
há problema de ambiente local e as validações equivalentes já foram
executadas manualmente.

------------------------------------------------------------------------

## 11. Prisma Client e `package-lock.json`

### 11.1 Geração do Prisma Client (`postinstall`)

A partir do Prisma 7, o pacote `@prisma/client` só fica utilizável depois
que o client é gerado. Sem isso, jobs que rodam testes falham com:

```text
Cannot find module '.prisma/client/default'
```

Para garantir que o client seja gerado em **todos os ambientes** (CI e
local), existe o script `postinstall` no `package.json`:

```json
"postinstall": "prisma generate"
```

Ele roda automaticamente após `npm ci` / `npm install`. Não é necessário
rodar `npx prisma generate` manualmente após instalar dependências.

### 11.2 Lockfile e diferenças entre sistemas operacionais

Algumas dependências nativas opcionais (por exemplo bindings de
`@unrs/resolver-binding-*` e `@tailwindcss/oxide-*`, que embarcam
`@emnapi/*`) são resolvidas de forma diferente conforme o sistema
operacional. Por isso, rodar `npm install` no **Windows** pode reescrever
o `package-lock.json` de um jeito que o `npm ci` da CI (Linux) rejeita,
com o erro:

```text
npm ci can only install packages when your package.json and
package-lock.json or npm-shrinkwrap.json are in sync.
```

Diretrizes para evitar esse problema:

-   Para **instalar dependências** sem alterar o lockfile, use `npm ci`
    (ele é somente leitura sobre o lock);
-   Evite `npm install` no Windows nessas branches apenas para instalar:
    isso pode reescrever o lock e quebrar a CI;
-   Ao **alterar dependências de propósito**, gere o lockfile em ambiente
    Linux equivalente ao da CI (por exemplo via Docker
    `node:24`) antes de commitar, garantindo um lock compatível;
-   Após um `npm install` acidental, verifique `git status`: se o
    `package-lock.json` aparecer modificado sem intenção, descarte com
    `git checkout package-lock.json`.

------------------------------------------------------------------------

## 12. Responsabilidades

Contribuidor:

-   Manter a branch atualizada;
-   Rodar validações locais;
-   Corrigir falhas de CI relacionadas à sua mudança;
-   Comunicar bloqueios no PR ou na issue.

Mantenedor:

-   Revisar o escopo;
-   Avaliar falhas externas;
-   Validar exceções;
-   Aprovar ou solicitar ajustes antes do merge.
