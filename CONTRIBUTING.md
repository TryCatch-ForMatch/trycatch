# 🤝 Guia de Contribuição - TryCatch For Match

Seja muito bem-vindo(a)! 🚀  
Aqui estão as regras, padrões e combinados pra garantir que todo mundo consiga colaborar de forma organizada, leve e produtiva.

---

## ✔️ Distribuição de tarefas

As tarefas são organizadas em cards/issues, que podem ser divididas em sub-issues, quando necessário, para melhor distribuição do trabalho.

⚠️ Importante:
O interessado em contribuir não cria nem assume a issue/card por conta própria.

### 📌 Fluxo correto de atribuição

1. O colaborador comenta na issue/card existente, informando que tem interesse em assumir a tarefa.

2. Um responsável pelo projeto irá:

  - Avaliar o pedido
  - Atribuir oficialmente o colaborador à issue/card
  - Definir ou validar o prazo de entrega

3. Caso necessário, o colaborador pode solicitar prorrogação de prazo, exclusivamente via comentário na própria issue/card.

Esse fluxo garante controle, equidade na distribuição e rastreabilidade das responsabilidades.

---

## 🗂️ Regras e Organização

### ✔️ Ao demonstrar interesse em uma tarefa (card):

- Comente claramente que deseja assumir a tarefa.
- Aguarde a atribuição formal por um responsável.
- Após atribuído, respeite o prazo acordado.
- Avalie sua disponibilidade antes de se comprometer.

### ✔️ Disciplina:

- Tarefa atribuída = responsabilidade assumida.
- Não deixe tarefas paradas sem atualização.
- Se perceber que não conseguirá cumprir o prazo, avise o quanto antes via comentário.

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
- Issue no GitHub

---

## 💛 Regras de Ouro

- Pessoas > Tecnologia
- Comprometimento > conhecimento técnico.
- Ninguém caminha sozinho: pergunte e ajude.
- Qualidade acima de quantidade.
- Comunicação sempre.
- Responsabilidade com prazos assumidos.

---

## 🧑‍💻 Reconhecimento de colaboradores no projeto

Para garantir que todos os colaboradores sejam reconhecidos, siga estas instruções:

1. AComente na issue ou PR:

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
