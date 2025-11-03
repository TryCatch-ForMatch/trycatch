# 🤝 Guia de Contribuição - TryCatch For Match

Seja muito bem-vindo(a)! 🚀  
Aqui estão as regras, padrões e combinados pra garantir que todo mundo consiga colaborar de forma organizada, leve e produtiva.

---

## ✔️ Distribuição de tarefas

Com intuito de distribuir de forma igualitária, os cards podem ser divididos em sub-issues.  
Basta clicar em **Create sub-issues**, escolher o assunto e assinar em **Assignees** como responsável.

---

## 🗂️ Regras e Organização

### ✔️ Ao escolher uma tarefa (card):

- Informe no card o **prazo que você se compromete a entregar**.
- Avalie sua agenda e treine sua organização pessoal — isso vale pra vida real.
- Caso tenha dificuldades, **peça ajuda**. O foco é **concluir em conjunto**.

### ✔️ Disciplina:

- **Pegar tarefa = responsabilidade.**
- Não deixe tarefas paradas sem atualização.
- Se não conseguir concluir, **avise o quanto antes.**

### ✔️ Feedback constante:

- Se tiver dúvida, pergunte.
- Se alguém pedir ajuda, ajude.

---

## 🌿 Git Flow - Padrão de Branches

### 🔥 Branch principal:
- `main`: versão estável e pronta pra produção.

### 🧪 Branch de desenvolvimento:
- `develop`: onde integramos todas as features antes de ir pra `main`.

### 🌱 Branches de funcionalidades e correções:

- `feat/nome-da-feature`: nova funcionalidade  
  Ex: `feat/criar-login`

- `fix/descricao-da-correcao`: correção de bug  
  Ex: `fix/erro-no-formulario`

- `docs/descricao`: alteração em documentação  
- `style/descricao`: formatação sem mudança de código  
- `refactor/descricao`: refatoração sem alterar comportamento  
- `test/descricao`: testes adicionados ou corrigidos  
- `chore/descricao`: manutenção (dependências, configs, etc.)

---

## 🔧 Antes de começar qualquer tarefa:

1. Faça um fork do projeto via Github, caso não saiba como, veja nesse [tutorial](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)

2. Atualize a branch `develop`:

```bash
git checkout develop
git pull origin develop
```

3. Crie uma nova branch:

```bash
git checkout -b feat/nome-da-sua-feature
```

4. Trabalhe, faça commits claros (use o Husky para isso)

5. Ao finalizar:

```bash
git push origin feat/nome-da-sua-feature
```

6. Abra um Pull Request (PR) para a branch `develop` do repositório da organização.

---

## 🔥 Pull Request (PR) - Fluxo

1. Cria a branch → Trabalha nela → Commit → Push  
2. Abre PR da sua branch para `develop`  
3. Descreva o que foi feito de forma clara  
4. Alguém faz a revisão  
5. PR aprovado → merge para `develop`

Quando tudo estiver pronto para produção, fazemos `develop → main`.

---

## 🏗️ Commits com padrão (Conventional Commits)

Usamos mensagens de commit padronizadas. Exemplos:

- `feat: criar tela de cadastro de projeto`
- `fix: corrigir bug no login`
- `docs: atualizar README`
- `style: formatar código com Prettier`
- `refactor: melhorar estrutura do formulário`
- `test: adicionar testes de autenticação`
- `chore: atualizar dependências`

### 💡 Como criar um commit corretamente:

Use o comando:

```bash
npm run commit
```

Isso vai abrir o **Commitizen**, que guia passo a passo.  
Não precisa decorar os padrões, o assistente ajuda com tudo.

---

## 🔗 Vincular commits a issues

Se o commit estiver relacionado a uma issue aberta, adicione no final:

- Para apenas referenciar: `Refs: #42`
- Para fechar automaticamente: `Fixes: #42`

Exemplo na descrição longa:

```
Atualiza botão de login. Fixes: #42
```

---

## 🐶 Husky: por que usamos?

O **Husky** roda verificações automáticas antes de você fazer `commit` ou `push`, garantindo que:

- Seu código esteja formatado corretamente (com Prettier)
- Não quebrou nenhum teste (com Jest)
- A mensagem do commit siga o padrão (com Commitlint)

Assim, evitamos bugs ou código fora do padrão de entrar na base.

**Não precisa se preocupar**, tudo roda automaticamente!

Se necessário, pode ignorar os hooks com:

```bash
git commit --no-verify
```

---

## 💬 Onde pedir ajuda?

- No grupo da comunidade
- Abrindo uma issue no GitHub

---

## 💛 Regras de Ouro

- Pessoas > Tecnologia
- Comprometimento > conhecimento técnico.
- Ninguém caminha sozinho: pergunte e ajude.
- Entregue no prazo que você mesmo escolheu.
- Qualidade acima de quantidade.
- Comunicação sempre.

---

## 🧑‍💻 Incluir novos colaboradores no projeto

Para garantir que todos os colaboradores sejam reconhecidos, siga estas instruções:

1. Abra uma **issue** ou **PR** que tenha a contribuição de alguém.
2. Comente na issue ou PR com o comando do All Contributors Bot:

```
@all-contributors please add @usuario for code, doc
```

> Substitua `@usuario` pelo nome de usuário GitHub do colaborador.  
> Você pode adicionar múltiplos tipos de contribuição, separados por vírgula (`code`, `doc`, `test`, etc.).  

3. O bot vai atualizar automaticamente:
   - O arquivo `CONTRIBUTORS.md` com o colaborador
   - O badge de contagem de contribuidores no README

Para ver todas as opções de emoji de contribuição, confira a [emoji key do All Contributors](https://allcontributors.org/docs/en/emoji-key).

---
