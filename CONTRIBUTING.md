# 🤝 Guia de Contribuição - TryCatch For Match

---
#### 🌐 **Languages / Idiomas:** [English](./README.en.md) | [Português](./README.md)
---

Seja muito bem-vindo(a)! 🚀  
Aqui estão as regras, padrões e combinados pra garantir que todo mundo consiga colaborar de forma organizada, leve e produtiva.

---

## ✔️ Distribuição de tarefas

<<<<<<< HEAD
Com intuito de distribuir de forma igualitária, os cards podem ser divididos em sub-issues.  
Basta clicar em **Create sub-issues**, escolher o assunto e assinar em **Assignees** como responsável.

---

## 🗂️ Regras e Organização
=======
As tarefas são organizadas em cards/issues, que podem ser divididas em sub-issues, quando necessário, para melhor distribuição do trabalho.

⚠️ **Importante:**
O interessado em contribuir não cria nem assume a issue/card por conta própria.
>>>>>>> develop

### 📌 Fluxo correto de atribuição

<<<<<<< HEAD
- Informe no card o **prazo que você se compromete a entregar**.
- Avalie sua agenda e treine sua organização pessoal — isso vale pra vida real.
- Caso tenha dificuldades, **peça ajuda**. O foco é **concluir em conjunto**.
=======
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
>>>>>>> develop

### ✔️ Disciplina:
- Tarefa atribuída = responsabilidade assumida.
- Não deixe tarefas paradas sem atualização.
<<<<<<< HEAD
- Se não conseguir concluir, **avise o quanto antes.**
=======
- Se perceber que não conseguirá cumprir o prazo, avise o quanto antes via comentário.
>>>>>>> develop

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
<<<<<<< HEAD

- `feat/nome-da-feature`: nova funcionalidade  
  Ex: `feat/criar-login`

- `fix/descricao-da-correcao`: correção de bug  
  Ex: `fix/erro-no-formulario`

- `docs/descricao`: alteração em documentação  
- `style/descricao`: formatação sem mudança de código  
- `refactor/descricao`: refatoração sem alterar comportamento  
- `test/descricao`: testes adicionados ou corrigidos  
=======
- `feat/nome-da-feature`: nova funcionalidade (Ex: `feat/criar-login`)
- `fix/descricao-da-correcao`: correção de bug (Ex: `fix/erro-no-formulario`)
- `docs/descricao`: alteração em documentação  
- `style/descricao`: formatação sem mudança de código  
- `refactor/descricao`: refatoração sem alterar comportamento  
- `test/descricao`: testes adicionados ou corrigidos  
>>>>>>> develop
- `chore/descricao`: manutenção (dependências, configs, etc.)

---

## 🔧 Antes de começar qualquer tarefa:

<<<<<<< HEAD
1. Atualize a branch `develop`:
=======
1. Faça um fork do projeto via GitHub. Caso não saiba como, veja este [tutorial](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).
>>>>>>> develop

2. Atualize a branch `develop` no seu computador:
```bash
git checkout develop
git pull origin develop
```

<<<<<<< HEAD
2. Crie uma nova branch:
=======
3. Crie uma nova branch para o seu trabalho:
>>>>>>> develop

```bash
git checkout -b feat/nome-da-sua-feature
```

<<<<<<< HEAD
3. Trabalhe, faça commits claros e frequentes.

4. Ao finalizar:
=======
4. Trabalhe, faça commits claros (use o Husky para isso)

5. Ao finalizar:
>>>>>>> develop

```bash
git push origin feat/nome-da-sua-feature
```

<<<<<<< HEAD
5. Abra um Pull Request (PR) para a branch `develop`.

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

=======
6. Abra um Pull Request (PR) para a branch `develop` do repositório da organização.

---

## 🤖 Como usar o Agente de Code Review Inteligente

Para ajudar a manter a qualidade do nosso código e te dar feedbacks rápidos antes mesmo de você enviar o seu Pull Request, nós usamos um robô de Code Review alimentado pela inteligência artificial do Gemini!

Ele vai ler os arquivos que você alterou e gerar um relatório super organizado na pasta `docs/codereview_reports/` apontando melhorias de segurança, performance e boas práticas.

### Aqui está o passo a passo para você configurar e usar essa ferramenta no seu computador:

1. Criando sua Chave de API (Gratuita)
Não se preocupe, você não precisa pagar nada para usar essa inteligência artificial no projeto!

- Acesse o site do [Google AI Studio](https://aistudio.google.com/api-keys).

- Faça login usando qualquer conta comum do Google (Gmail).

- No menu lateral ou no topo, procure e clique no botão "Get API key" (Obter chave de API).

- Clique em "Create API Key" (Criar chave de API) e depois em "Create API key in new project".

- Uma sequência grande de letras e números vai aparecer. Clique no botão para copiar essa chave e guarde-a (não feche a página antes de copiar!).


2. Configurando suas Variáveis de Ambiente
O projeto precisa saber qual é a sua chave para conseguir conversar com o Gemini.

- Abra o seu arquivo `.env.local` (que você criou seguindo o passo a passo do [README](./README.md#-4-configure-o-arquivo-env)).

- Adicione a seguinte linha (substituindo pelo código que você copiou lá no site do Google):

```
GEMINI_API_KEY=Cole_Sua_Chave_Aqui_Sem_Aspas
```

3. Rodando o Code Review
Com tudo configurado, agora ficou fácil! Sempre que quiser revisar seu código, abra o terminal na raiz do projeto e digite:

```Bash
npm run review
```

O terminal vai te dar 3 opções muito legais:

- [1] Apenas os arquivos alterados: Perfeito para rodar antes de enviar seu código para nós! Ele revisa só o que você mexeu e que ainda não foi commitado.

- [2] Escolher uma pasta/módulo específico: Ótimo para quando você quer estudar ou revisar uma pasta inteira (como a src/app ou src/components).

- [3] Todo o projeto: Ele vai ler o projeto inteiro dividindo em pequenos lotes para a IA não travar.

Abra o arquivo gerado na pasta `docs/codereview_reports/` para ver as dicas do seu Revisor Sênior virtual! 🚀

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

>>>>>>> develop
---

## 💬 Onde pedir ajuda?

<<<<<<< HEAD
- No grupo da comunidade
=======
- No grupo da comunidade [Discord](https://discord.gg/ZgUHkzf3r)
>>>>>>> develop
- Abrindo uma issue no GitHub

---

## 💛 Regras de Ouro

<<<<<<< HEAD
- Comprometimento > conhecimento técnico.
- Ninguém caminha sozinho: pergunte e ajude.
- Entregue no prazo que você mesmo escolheu.
- Qualidade acima de quantidade.
- Comunicação sempre.
=======
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
>>>>>>> develop
