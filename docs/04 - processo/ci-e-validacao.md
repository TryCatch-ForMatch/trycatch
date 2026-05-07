# Documento de Processo --- CI e Validação de Pull Requests

**Classificação:** Documento de Processo\
**Camada:** 4 --- Processo\
**Status:** Versão inicial

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

## 2. O que é CI

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

## 3. Quando a pipeline roda

O workflow principal está definido em `.github/workflows/ci.yml`.

Atualmente ele roda em:

-   Pull Requests direcionados para `main`;
-   Pull Requests direcionados para `develop`;
-   Pushes na branch `test/tests-ci`.

A branch `test/tests-ci` é usada para validar alterações no próprio
workflow. Para contribuições comuns, o fluxo esperado é abrir PR para
`develop`.

------------------------------------------------------------------------

## 4. Validações executadas pela CI

### 4.1 Build and Prepare Environment

Objetivo: garantir que a aplicação consiga compilar em ambiente limpo.

Passos principais:

-   Faz checkout do repositório;
-   Configura Node.js 24;
-   Instala dependências com `npm ci`;
-   Cria arquivo `.env` com secrets configurados no GitHub;
-   Executa `npm run build`.

### 4.2 Lint Codebase

Objetivo: verificar padrões de código e regras do Next.js/ESLint.

Comando executado:

```bash
npm run lint
```

### 4.3 Run Tests (Jest)

Objetivo: garantir que os testes automatizados continuem passando.

Comando executado:

```bash
npm run test
```

### 4.4 Run Tests with Coverage

Objetivo: gerar cobertura de testes e impedir queda abaixo do mínimo
definido.

Comando executado na CI:

```bash
npx jest --coverage \
  --coverageThreshold='{"global":{"branches":40,"functions":40,"lines":40,"statements":40}}'
```

O relatório de cobertura é enviado como artefato do workflow.

### 4.5 SonarQube Scan

Objetivo: executar análise de qualidade e segurança via SonarQube.

Esse job depende do secret `SONAR_TOKEN`. Caso falhe por ausência de
permissão ou configuração externa, o responsável pelo projeto deve ser
acionado.

### 4.6 Audit Dependencies

Objetivo: bloquear dependências com vulnerabilidades de severidade alta
ou superior.

Comando executado:

```bash
npm audit --audit-level=high
```

------------------------------------------------------------------------

## 5. Validação local antes de abrir PR

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

## 6. Requisitos para abrir Pull Request

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

## 7. O que fazer quando um check falhar

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

## 8. Requisitos para merge

Um PR só deve ser considerado pronto para merge quando:

-   A CI obrigatória estiver verde, ou a falha externa tiver sido
    validada por mantenedor;
-   O PR estiver sem conflitos com `develop`;
-   O escopo estiver alinhado com a issue;
-   Houver aprovação de revisão, quando aplicável;
-   A documentação estiver atualizada quando a mudança alterar fluxo,
    regra de negócio ou comportamento visível.

------------------------------------------------------------------------

## 9. Relação com Husky

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

## 10. Responsabilidades

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
