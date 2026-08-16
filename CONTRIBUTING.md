# 🤝 Guia de Contribuição - TryCatch For Match

---
#### 🌐 **Languages / Idiomas:** [English](./CONTRIBUTING.en.md) | [Português](./CONTRIBUTING.md)
---

Seja muito bem-vindo(a)! 🚀

Este projeto existe para ajudar pessoas a **aprenderem a contribuir em open
source**. Não importa se é sua primeira contribuição ou se você já tem anos de
carreira — há espaço e tarefa para os dois.

Este guia acompanha você do começo ao fim: pegar uma tarefa, preparar o
ambiente, trabalhar e abrir o pull request.

> 💡 **Primeira vez contribuindo em open source?** Você não precisa saber tudo.
> Leia até o fim da seção *Começando* e peça ajuda no
> [Discord](https://discord.gg/ZgUHkzf3r) sempre que travar. Perguntar faz parte.

---

## 📖 Índice

1. [Como as tarefas são distribuídas](#-como-as-tarefas-são-distribuídas)
2. [Começando: do fork ao projeto rodando](#-começando-do-fork-ao-projeto-rodando)
3. [Vai usar IA? Configure antes de começar](#-vai-usar-ia-configure-antes-de-começar)
4. [O fluxo de trabalho: branch, commit e PR](#-o-fluxo-de-trabalho-branch-commit-e-pr)
5. [Trabalhando com dependências](#-trabalhando-com-dependências)
6. [Agente de code review com IA](#-agente-de-code-review-com-ia)
7. [Husky e Integração Contínua](#-husky-e-integração-contínua)
8. [Acompanhamento da tarefa](#-acompanhamento-da-tarefa)
9. [Onde pedir ajuda](#-onde-pedir-ajuda)
10. [Regras de ouro](#-regras-de-ouro)
11. [Reconhecimento de colaboradores](#-reconhecimento-de-colaboradores)

---

## ✔️ Como as tarefas são distribuídas

As tarefas são organizadas em **cards/issues** no GitHub Projects, que podem ser
divididas em sub-issues quando necessário.

⚠️ **Importante:** você não cria nem assume a issue por conta própria.

### 📌 Fluxo correto de atribuição

1. Comente na issue/card informando que tem interesse em assumir a tarefa.
2. Um responsável pelo projeto irá:
   - avaliar o pedido;
   - atribuir oficialmente você à issue/card;
   - definir ou validar o prazo de entrega.
3. Se precisar de mais tempo, peça prorrogação **na própria issue**.

Esse fluxo garante controle, equidade na distribuição e rastreabilidade.

### ✔️ Ao demonstrar interesse

- Avalie sua disponibilidade **antes** de se comprometer.
- Aguarde a atribuição formal antes de começar a codar.
- Tarefa atribuída = responsabilidade assumida.
- Se perceber que não vai conseguir cumprir o prazo, avise o quanto antes.

> 💡 **É sua primeira contribuição?** Procure issues marcadas como
> `good first issue`. Elas foram escolhidas por serem seguras para começar.

---

## 🚀 Começando: do fork ao projeto rodando

Siga na ordem. Cada passo depende do anterior.

### 1. Faça um fork do projeto

Clique em **Fork**, no topo da página do repositório no GitHub. Isso cria uma
cópia do projeto na sua conta.

> Nunca contribuiu com fork antes? Veja o
> [tutorial oficial do GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

### 2. Clone o seu fork para o computador

```bash
git clone https://github.com/SEU-USUARIO/trycatch.git
cd trycatch
```

Troque `SEU-USUARIO` pelo seu nome de usuário no GitHub.

> ⚠️ **No Windows:** não coloque o projeto dentro de pastas sincronizadas
> (OneDrive, Google Drive, Dropbox). A sincronização trava arquivos e o git
> falha ao trocar de branch. Prefira algo como `C:\projetos\trycatch`.

### 3. Conecte ao repositório original

Assim você consegue trazer as novidades do projeto para o seu fork:

```bash
git remote add upstream https://github.com/TryCatch-ForMatch/trycatch.git
```

Confira com `git remote -v`. Devem aparecer os dois: `origin` (seu fork) e
`upstream` (o projeto original).

### 4. Instale as dependências

```bash
npm run setup
```

Esse comando roda `npm ci`, que instala **exatamente** o que está no
`package-lock.json`.

> ⚠️ **Não use `npm install` para configurar o ambiente.** Ele pode reescrever o
> `package-lock.json` e quebrar a integração contínua para todo mundo. Os
> detalhes estão em [Trabalhando com dependências](#-trabalhando-com-dependências).

**Versão do Node:** o projeto usa **Node 24**, a mesma do CI e da produção. Se
você usa `nvm` ou `fnm`, rode `nvm use` na raiz do projeto.

> O Prisma Client é gerado automaticamente pelo `postinstall`. Você **não**
> precisa rodar `npx prisma generate` na mão.

### 5. Configure as variáveis de ambiente

O projeto precisa de um arquivo `.env` na raiz. Peça o modelo no
[Discord](https://discord.gg/ZgUHkzf3r) ou consulte a seção correspondente no
[README](./README.md).

No mínimo você vai precisar de `DATABASE_URL`, `NEXTAUTH_SECRET` e `JWT_SECRET`.

> 🔒 O `.env` **nunca** vai para o repositório. Ele já está no `.gitignore` —
> não force a inclusão dele em nenhuma hipótese.

### 6. Rode o projeto

```bash
npm run dev
```

Abra <http://localhost:3000>. Se a página carregar, seu ambiente está pronto. 🎉

### 7. Verifique que está tudo funcionando

```bash
npm test            # testes
npm run lint        # padrões de código
npx tsc --noEmit    # checagem de tipos
```

> ℹ️ O projeto tem **erros de tipo já conhecidos**, que estão sendo corrigidos
> aos poucos. Se `npx tsc --noEmit` acusar erros em arquivos que você não
> tocou, não são seus — siga em frente e não tente corrigi-los.

---

## 🤖 Vai usar IA? Configure antes de começar

Muita gente usa assistente de IA no editor, e isso é **bem-vindo** aqui. O
projeto tem instruções próprias para essas ferramentas: elas explicam as regras,
as convenções e o fluxo, e ajustam o nível de explicação à sua experiência.

**Você não precisa usar IA para contribuir.** Se preferir trabalhar sem, pule
esta seção — o restante do guia é suficiente.

### Como funciona

O projeto guarda o conteúdo em `docs/05 - contribuicao/`, e cada ferramenta lê
automaticamente um arquivo de "porta de entrada" na raiz:

| Ferramenta | Arquivo que ela lê sozinha |
|---|---|
| GitHub Copilot | `.github/copilot-instructions.md` |
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursor/rules/trycatch.mdc` |

Ou seja: **basta abrir o projeto com a ferramenta instalada.** Ela encontra as
instruções sozinha e passa a seguir o fluxo do projeto.

### Passo a passo

**1. Escolha e instale uma ferramenta**

| Ferramenta | Como instalar | Custo |
|---|---|---|
| **GitHub Copilot** | Extensão *GitHub Copilot* no VS Code → entrar com a conta GitHub | Plano gratuito com limite mensal; grátis para estudantes e mantenedores de open source |
| **Claude Code** | Extensão no VS Code, ou pelo terminal — veja a [documentação oficial](https://docs.claude.com/en/docs/claude-code/overview) | Plano gratuito com limite; planos pagos |
| **Cursor** | Editor próprio, baseado no VS Code — [cursor.com](https://cursor.com) | Plano gratuito com limite; planos pagos |

Se você nunca usou nenhuma, o **Copilot** costuma ser o caminho mais simples:
instala como extensão comum do VS Code e tem plano gratuito.

**2. Abra o projeto na ferramenta**

Não precisa configurar mais nada. Ao abrir a pasta do projeto, a IA lê o arquivo
de porta e é direcionada para as instruções completas.

**3. Diga o que você quer fazer**

Comece por algo simples. Use **o número da issue que foi atribuída a você**:

> Quero pegar a issue #NÚMERO. Por onde começo?

> ⚠️ `#NÚMERO` é um espaço a preencher, não um comando. Troque pelo número real
> — por exemplo, `#487`. Se você colar o texto como está, a IA vai procurar uma
> issue que não existe.
>
> Ainda não tem issue atribuída? Diga isso mesmo: *"ainda não peguei nenhuma
> tarefa, pode me ajudar a escolher?"*

A IA vai perguntar duas coisas: **em qual idioma você prefere conversar** e
**qual é a sua experiência** com contribuição em open source. A partir daí ela
ajusta o nível de explicação — mais detalhada para quem está começando, mais
direta para quem já conhece o fluxo.

> 🌍 **A documentação do projeto está em português, mas você não precisa
> falar português para contribuir.** A IA conversa com você no seu idioma e
> traduz o conteúdo dos documentos conforme necessário. Se preferir escrever em
> inglês, espanhol ou qualquer outro idioma, é só escrever — ela acompanha.

**4. (Opcional) Registre suas preferências**

Para não responder a mesma pergunta toda vez:

```bash
cp "docs/05 - contribuicao/MINHAS-PREFERENCIAS.example.md" "docs/05 - contribuicao/MINHAS-PREFERENCIAS.md"
```

Depois edite o arquivo com seu nível, sua ferramenta e como prefere trabalhar.
Ele fica **só na sua máquina** — está no `.gitignore`, como o `.env`.

### O que esperar da IA neste projeto

- **Ela ensina antes de fazer.** Diante de algo que você aprenderia fazendo — um
  comando de git, rodar um teste, ler uma mensagem de erro —, ela mostra o
  caminho e espera. Se você insistir, ela faz e explica. O objetivo aqui é você
  aprender, não só o código ficar pronto.
- **`git commit`, `git push` e abrir o PR são sempre seus.** A IA ajuda a montar
  a mensagem, mas quem executa é você.
- **Ela avisa quando algo fere as regras do projeto**, mesmo que você peça. Se
  isso acontecer, leia o alerta — em geral é sobre segurança ou dados de pessoas
  reais.

### Documentos, se quiser se aprofundar

| Arquivo | Conteúdo |
|---|---|
| [`IA-REGRAS.md`](docs/05%20-%20contribuicao/IA-REGRAS.md) | Regras invioláveis: segurança, autorização, dados pessoais, fluxo de git |
| [`IA-GUIA.md`](docs/05%20-%20contribuicao/IA-GUIA.md) | O fluxo de trabalho completo, passo a passo |
| [`IA-NIVEIS.md`](docs/05%20-%20contribuicao/IA-NIVEIS.md) | Como a IA se ajusta ao seu nível de experiência |

> 💡 Se a IA fizer algo diferente do que está documentado, **é a documentação
> que vale**. Avise no Discord ou abra uma issue.

---

## 🌿 O fluxo de trabalho: branch, commit e PR

Este é o ciclo completo de uma contribuição, do início ao fim.

### As branches do projeto

| Branch | Para que serve |
|---|---|
| `main` | Versão estável, em produção. **Nunca** trabalhe direto nela |
| `develop` | Onde tudo é integrado. **É daqui que sai a sua branch, e é para cá que vai o seu PR** |
| `feat/`, `fix/`, … | A sua branch de trabalho |

Prefixos:

| Prefixo | Quando usar | Exemplo |
|---|---|---|
| `feat/` | funcionalidade nova | `feat/criar-login` |
| `fix/` | correção de bug | `fix/erro-no-formulario` |
| `docs/` | documentação | `docs/atualizar-readme` |
| `style/` | formatação, sem mudar comportamento | `style/ajustar-espacamento` |
| `refactor/` | refatoração, sem mudar comportamento | `refactor/extrair-service` |
| `test/` | testes | `test/cobertura-de-login` |
| `chore/` | manutenção, dependências, configuração | `chore/atualizar-eslint` |

### 1. Atualize a develop antes de começar

**Sempre**, no início de cada tarefa:

```bash
git checkout develop
git pull upstream develop
git push origin develop
```

O `pull upstream` traz as novidades do projeto original; o `push origin`
atualiza o seu fork.

### 2. Crie a branch de trabalho

```bash
git checkout -b feat/nome-da-sua-feature
```

O `-b` cria a branch e já muda para ela.

### 3. Trabalhe e faça commits

Use mensagens no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

```
feat: criar tela de cadastro de projeto
fix: corrigir bug no login
docs: atualizar guia de contribuição
```

Se preferir ser guiado passo a passo:

```bash
npm run commit
```

Isso abre o **Commitizen**, que monta a mensagem com você. Não precisa decorar
os padrões.

**Vinculando a uma issue** — no final da mensagem:

- `Refs: #42` apenas referencia a issue;
- `Fixes: #42` fecha a issue automaticamente quando o PR for mergeado.

### 4. Verifique antes de enviar

```bash
npm test
npm run lint
npx tsc --noEmit
```

### 5. Envie e abra o Pull Request

```bash
git push origin feat/nome-da-sua-feature
```

No GitHub, abra o PR **da sua branch para a `develop`** do repositório da
organização — nunca para a `main`.

Preencha o template que aparece: o que foi feito, a issue relacionada, como
testar. Descrever bem acelera a revisão.

### 6. Revisão

Alguém do time revisa e pode pedir ajustes. **Isso é normal e não é crítica
pessoal** — é assim que o código melhora e que a gente aprende junto. Responda
aos comentários, ajuste e envie de novo com um novo commit.

Aprovado o PR, ele é mergeado na `develop`. Quando tudo estiver pronto para
produção, fazemos `develop → main`.

---

## 📦 Trabalhando com dependências

Esta seção importa mesmo que você não vá mexer em pacote nenhum — porque é fácil
alterar o `package-lock.json` sem querer.

### Para apenas instalar o projeto

```bash
npm run setup
```

Nunca `npm install`. O `npm ci` instala exatamente o que está no lockfile, sem
reescrevê-lo.

### 🔴 O `package-lock.json` só pode ser gerado em Linux

Se você usa **Windows ou macOS**, **não rode `npm install`** neste projeto.

**Por quê:** algumas dependências trazem versões compiladas específicas por
sistema operacional. O npm monta a árvore de forma diferente em cada plataforma,
e o `npm ci` do CI — que roda em Linux — recusa um lockfile gerado em outro
sistema. Isso já derrubou a integração contínua do projeto por horas.

**Como adicionar ou atualizar um pacote, então:**

| Situação | O que fazer |
|---|---|
| Atualizar versão de um pacote | Deixe o **Dependabot** — ele roda em Linux |
| Adicionar dependência nova | Use **GitHub Codespaces** (Linux, no navegador), WSL ou Docker |
| Só instalar para trabalhar | `npm run setup` — não altera o lockfile |

No Codespaces:

```bash
npm install <pacote>
npm ci                              # valida na mesma plataforma do CI
git add package.json package-lock.json
```

> ⚠️ **Antes de adicionar qualquer dependência, combine com o time.** Toda
> dependência nova é superfície de ataque, peso no bundle e manutenção futura.

### Se o `package-lock.json` aparecer modificado sem querer

Se você **não mexeu em dependências** e ele aparece como alterado, foi um
`npm install` acidental. Restaure:

```bash
git checkout -- package-lock.json
npm run setup
```

> ⚠️ **Só faça isso se a alteração foi mesmo acidental.** Se você estava
> corrigindo o lockfile de propósito, esse comando desfaz o seu trabalho. Na
> dúvida, pergunte antes.

---

## 🔍 Agente de code review com IA

Além das instruções para o seu assistente no editor, o projeto tem um **robô de
code review** que analisa os arquivos alterados e gera um relatório em
`docs/codereview_reports/`, apontando melhorias de segurança, performance e boas
práticas.

É opcional, gratuito e roda no seu computador.

### 1. Crie sua chave de API (gratuita)

- Acesse o [Google AI Studio](https://aistudio.google.com/api-keys).
- Faça login com uma conta Google comum.
- Clique em **Get API key** → **Create API Key** → **Create API key in new project**.
- Copie a chave que aparecer (não feche a página antes de copiar!).

### 2. Configure a variável de ambiente

Abra o seu arquivo `.env` (o mesmo do passo 5 de *Começando*) e adicione:

```
GEMINI_API_KEY=cole_sua_chave_aqui_sem_aspas
```

> 🔒 A chave é sua e pessoal. O `.env` não vai para o repositório — nunca
> compartilhe a chave em issue, PR ou mensagem.

### 3. Rode o review

```bash
npm run review
```

O terminal oferece três opções:

- **[1] Apenas os arquivos alterados** — ideal antes de abrir o PR;
- **[2] Uma pasta específica** — bom para estudar um módulo;
- **[3] Todo o projeto** — em lotes, para não sobrecarregar.

Depois abra o relatório gerado em `docs/codereview_reports/`. 🚀

---

## 🐶 Husky e Integração Contínua

### Husky: verificações automáticas antes do commit

O **Husky** roda checagens automáticas antes de `commit` e `push`:

- formatação com Prettier;
- testes relacionados aos arquivos alterados, com Jest;
- padrão da mensagem de commit, com Commitlint;
- verificação de alterações indevidas no `package-lock.json`.

**Não precisa configurar nada** — funciona sozinho depois do `npm run setup`.

Se um hook bloquear o seu commit, **leia a mensagem**: quase sempre ela diz o que
fazer. Existe a opção de ignorar as verificações:

```bash
git commit --no-verify
```

> ⚠️ Use isso **só** quando souber exatamente por que o hook está errado, e
> explique o motivo na descrição do PR. Pular as verificações por pressa costuma
> transferir o problema para outra pessoa.

### CI: o que roda quando você abre um PR

Automaticamente: **build**, **lint**, **testes**, **cobertura**, **auditoria de
dependências** e, em seguida, a análise do **SonarCloud**.

### 🟥 Viu vermelho no seu PR? Provavelmente não é culpa sua

Esta é a parte que mais assusta quem abre o primeiro pull request. Alguns jobs
podem falhar por motivos **que não têm relação com o seu código**:

- **Seu PR vem de um fork.** Por segurança, o GitHub **não entrega os secrets do
  repositório** para pull requests vindos de forks — é o que impede que alguém
  abra um PR malicioso só para capturar chaves. Jobs que dependem desses valores
  podem falhar ou ser pulados, e isso é esperado.
- **O job de auditoria de dependências** pode estar vermelho por vulnerabilidades
  em ferramentas de desenvolvimento que ainda não têm correção publicada. É
  anterior ao seu PR.
- **O SonarCloud roda num workflow separado**, disparado depois da CI —
  justamente para contornar a limitação de secrets em forks. Se ele demorar a
  aparecer, aguarde.

**O que fazer:** não tente "consertar" esses erros. Confira se os jobs de
**build**, **lint** e **testes** passaram — esses sim dependem do seu código. Se
algum deles falhar, aí vale investigar.

Na dúvida, **comente no PR perguntando**. Ninguém vai achar ruim, e é bem
provável que a resposta seja "pode ignorar, é do nosso lado".

O detalhamento está em
[`docs/04 - processo/ci-e-validacao.md`](docs/04%20-%20processo/ci-e-validacao.md).

---

## 🧭 Acompanhamento da tarefa

Depois que a tarefa for atribuída, mantenha o card atualizado para que o time
saiba o estado real do trabalho.

### Status do card

| Status | Quando usar |
|---|---|
| **Em andamento** | ao começar a implementar ou revisar |
| **Bloqueado** | quando precisar de decisão, acesso, ajuste de escopo ou ajuda técnica |
| **Concluído** | só depois de abrir o PR, validar localmente e deixar o link no card |

### Comunicação

- Informe o prazo combinado antes de iniciar.
- Registre mudanças de prazo no próprio card.
- Explique bloqueios com contexto suficiente para outra pessoa conseguir ajudar.
- Ao abrir o PR, informe o link e diga quais validações você executou.

---

## 💬 Onde pedir ajuda

- No grupo da comunidade no [Discord](https://discord.gg/ZgUHkzf3r)
- Comentando na própria issue
- Abrindo uma issue nova, se for algo que ainda não existe

**Não fique travado sozinho.** Perguntar cedo economiza o tempo de todo mundo, e
ninguém aqui vai achar sua dúvida boba.

---

## 💛 Regras de ouro

- Pessoas > Tecnologia
- Comprometimento > conhecimento técnico
- Ninguém caminha sozinho: pergunte e ajude
- Qualidade acima de quantidade
- Comunicação sempre
- Responsabilidade com prazos assumidos

---

## 🧑‍💻 Reconhecimento de colaboradores

Para garantir que todo mundo seja reconhecido, comente na issue ou no PR:

```
@all-contributors please add @usuario for code, doc
```

> Substitua `@usuario` pelo nome de usuário no GitHub. Você pode listar vários
> tipos de contribuição separados por vírgula (`code`, `doc`, `test`, etc.).

O bot atualiza automaticamente:

- o arquivo `CONTRIBUTORS.md`;
- o badge de contagem de contribuidores no README.

Veja todos os tipos na
[emoji key do All Contributors](https://allcontributors.org/docs/en/emoji-key).

---

**Obrigada por contribuir com o TryCatch For Match!** 💛
