# 🤝 Guia de Contribuição - TryCatch For Match

Seja muito bem-vindo(a)! 🚀  
Aqui estão as regras, padrões e combinados pra garantir que todo mundo consiga colaborar de forma organizada, leve e produtiva.

---

## 🗂️ **Regras e Organização**

### ✔️ Ao escolher uma tarefa (card):

- Informe no card o **prazo que você se compromete a entregar**.
- Avalie sua agenda, aprenda a se organizar — isso é treino pra vida real.
- Caso tenha dificuldades, **peça ajuda**. O foco é **concluir**.

### ✔️ Disciplina:

- **Pegar tarefa = responsabilidade.**
- Não deixe tarefas paradas sem atualização.
- Se não conseguir concluir, **avisa o quanto antes.**

### ✔️ Feedback constante:

- Se tiver dúvida, pergunte.
- Se alguém pedir ajuda, ajude.

---

## 🌿 Git Flow - Padrão de Branches

### 🔥 Branch principal:

- `main`: versão estável e pronta pra produção.

### 🧪 Branch de desenvolvimento:

- `develop`: onde integramos todas as features antes de ir pra `main`.

### 🌱 Branches de feature (novas funcionalidades):

Formato:

- `feat/nome-da-feature`

Exemplos:

- `feat/criar-login`
- `feat/cadastro-projetos`

### 🐛 Branches de correção:

Formato:

- `fix/descricao-da-correcao`

Exemplos:

- `fix/erro-no-formulario`
- `fix/ajuste-no-cadastro`

## Tipos de Branches

feat: nova funcionalidade

- fix/correcao

- docs/alteracoes-em-documentacao

- style/formatacao

- refactor/refatoracao-de-codigo (sem mudar funcionalidade)

- test/testes-adicionados-corrigidos

- chore/manutencao (configs, dependências, etc.)

---

## 🚨 Antes de começar qualquer tarefa:

1. Sempre atualize a branch `develop`:

```bash
git checkout develop
git pull origin develop
```

2. Crie uma nova branch baseada na develop:

```bash
git checkout -b feat/nome-da-sua-feature
```

3. Trabalhe na sua branch, faça commits claros.

4. Ao finalizar, faça push:

```bash
git push origin feat/nome-da-sua-feature
```

5. Abra um Pull Request (PR) da sua branch para develop.

## 🔥 Pull Request (PR) - Como funciona

### ✔️ Fluxo básico:

1. Cria a branch → Trabalha nela → Commita → Push.

2. Abre o PR da sua branch (feat/... ou fix/...) para develop.

3. Descreva claramente no PR o que foi feito.

4. Reviewer faz comentários e aprova.

5. Fazemos merge para develop.

6. Quando o projeto estiver pronto pra deploy, fazemos develop → main.

## 🏗️ Organização dos Commits

Usamos Conventional Commits como padrão:

- feat: nova funcionalidade

- fix: correção de bug

- docs: alterações em documentação

- style: formatação, espaços, ponto e vírgula, etc.

- refactor: refatoração de código (sem mudar funcionalidade)

- test: testes adicionados ou corrigidos

- chore: tarefas de manutenção (configs, dependências, etc.)

### Exemplos:

- feat: criar tela de cadastro de projeto

- fix: corrigir bug no login

- docs: atualizar documentação de deploy

## 💡 Regras de Ouro

- Comprometimento é mais importante que saber tudo.

- Aqui ninguém caminha sozinho — peça ajuda.

- Entregue no prazo que você mesmo escolheu.

- Qualidade acima de quantidade.

- Comunicação sempre.

## 💬 Onde pedir ajuda?

- No grupo da comunidade.

- Abrindo uma issue aqui no GitHub.
