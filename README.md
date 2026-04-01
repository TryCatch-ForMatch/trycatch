# TryCatch 4Match - Plataforma de Organização de Projetos Colaborativos

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/github/all-contributors/TryCatch-ForMatch/trycatch?color=ee8449&style=flat-square)](./CONTRIBUTORS.md)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## 🚀 Sobre o projeto

**TryCatch** é uma plataforma colaborativa desenvolvida para organizar projetos, conectar pessoas, gerar portfólios reais e criar um ambiente que simula o mercado de trabalho. Aqui praticamos **comprometimento, disciplina e colaboração.**

Mais do que apenas código, este projeto é um laboratório de aprendizado coletivo, onde evoluímos juntos tanto em habilidades técnicas quanto comportamentais.

---

## 🔥 Objetivo

- Construir uma plataforma web onde:
  - Membros possam criar e gerenciar projetos internos;
  - As tarefas sejam divididas com base em habilidades técnicas;
  - O sistema faça "match" entre tarefas e membros com perfis compatíveis;
  - Um histórico de colaboração seja gerado para portfólios reais.

---

## 🏗️ Stack do Projeto

- **Frontend:** Next.js + TypeScript + TailwindCSS
- **Backend:** API Routes do Next.js + TypeScript + Prisma
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Ambiente de desenvolvimento:** Docker + Docker Compose ou Neon (PostgreSQL na nuvem)
- **Design:** Figma
- **Controle de versão:** Git + GitHub
- **Kanban:** GitHub Projects

---

## ❤️ Construção coletiva

Nosso foco é o desenvolvimento real de habilidades: trabalho em equipe, responsabilidade e entrega. Todos os participantes são incentivados a colaborar de forma ativa e comprometida, simulando uma equipe de desenvolvimento profissional.

---

## 🙌 Como contribuir?

Leia o [Guia de Contribuição](./CONTRIBUTING.md) para entender o fluxo de trabalho, boas práticas, padrões e combinados da equipe.

Confira também nosso arquivo [CONTRIBUTORS.md](./CONTRIBUTORS.md) para conhecer todos os colaboradores incríveis que ajudaram a construir este projeto. 🚀

---

## ⚙️ Como rodar localmente

### 🧾 1. Pré-requisitos

- Node.js (v20 ou superior - LTS)
- Docker + Docker Compose (caso queira rodar o banco via container)

---

### 📦 2. Clone o repositório

```bash
git clone https://github.com/TryCatch-ForMatch/trycatch.git
cd trycatch
git checkout develop
```

---

### 📥 3. Instale as dependências

```bash
npm install
```

---

### 🔐 4. Configure o arquivo `.env`

Crie um arquivo .env.local na raiz do projeto com base no exemplo abaixo (o Next.js lê esse arquivo automaticamente e ele já está configurado para não subir pro seu GitHub):

```env
# 👉 Opção 1: Banco compartilhado (Neon - recomendado para o time)
DATABASE_URL="postgresql://neondb_owner:SUA_SENHA_AQUI@ep-autumn-surf-acr8iv80-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# 👉 Opção 2: Banco rodando via Docker local
# DATABASE_URL="postgresql://trycatch_user:trycatch_pass@localhost:5555/trycatch_db"

# 👉 Opção 3: Banco rodando localmente sem Docker
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/trycatch_db"

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=um-segredo-seguro
JWT_SECRET=um-outro-segredo
```

---

### 🐳 5. Escolha como rodar o banco de dados

Você tem **3 opções** para usar o banco PostgreSQL no ambiente de desenvolvimento:

✅ **Opção 1 – Usar o banco compartilhado no Neon (recomendado)**  
Não precisa instalar ou subir Docker. Basta configurar o `.env` com a URL do Neon e rodar as migrations normalmente:

```bash
npx prisma migrate deploy
npm run seed   # opcional, para criar usuário admin de testes
```

✅ **Opção 2 – Usar Docker localmente**  
Caso prefira rodar seu próprio container PostgreSQL localmente:

```bash
docker-compose up -d
```

Isso cria um banco PostgreSQL acessível em `localhost:5555`.  
Depois, aplique as migrations:

```bash
npx prisma migrate dev
npm run seed
```

✅ **Opção 3 – Usar PostgreSQL local instalado na máquina**  
Se você já tem o PostgreSQL instalado, basta ajustar a `DATABASE_URL` para usar a porta padrão `5432` e rodar as migrations normalmente.

---

### 🔃 6. Rode as migrations do Prisma

Independente da opção escolhida, aplique as migrations do Prisma para criar as tabelas:

```bash
npx prisma generate
npx prisma migrate deploy   # se estiver usando Neon
# ou
npx prisma migrate dev      # se estiver usando Docker/local
```

💡 **Dica:** Utilize `npx prisma studio` para visualizar o banco de dados em uma interface web.

---

## 📸 Upload de Avatar com Cloudinary

Este projeto utiliza o **[Cloudinary](https://cloudinary.com)** para armazenar e otimizar os avatares dos usuários.  
O upload é feito automaticamente para o Cloudinary, e a URL da imagem é salva no banco de dados.

---

### 📝 Passo 1: Criar conta gratuita no Cloudinary

1. Acesse [https://cloudinary.com](https://cloudinary.com)
2. Clique em **Sign Up Free** e crie uma conta (plano gratuito já é suficiente).
3. No painel do Cloudinary, vá em **Dashboard → API Keys** e copie:
   - **Cloud name**
   - **API Key**
   - **API Secret**

---

### ⚙️ Passo 2: Configurar variáveis de ambiente

No ambiente **local**, adicione essas variáveis no arquivo `.env.local` (que já está no `.gitignore`):

```env
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=sua_api_secret
```

---

### ▶️ 7. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Abra o navegador em: [http://localhost:3000](http://localhost:3000)

---

## 🤖 Está desenvolvendo? Use nosso Code Reviewer!

Para te ajudar a aprender e garantir que seu código está seguindo boas práticas antes de enviar um Pull Request, nós temos um **Agente de Code Review** integrado com a IA do Gemini.

Ele roda direto no seu terminal e gera relatórios automáticos de melhorias!

👉 [Clique aqui no nosso Guia de Contribuição](./CONTRIBUTING.md#️-como-usar-o-agente-de-code-review-inteligente) para ver como criar sua chave gratuita do Gemini e rodar o comando `npm run review`.

---

## 👤 Criar Usuário Admin para Testes

Para facilitar os testes da API, incluímos um script que cria um usuário administrador no banco de dados.

📥 **Como rodar**  
Após configurar o `.env` corretamente e rodar as migrations do Prisma, execute:

```bash
npm run seed
```

Esse comando executa o script que cria um usuário admin com os seguintes dados:

- **Email:** admin@admin.com  
- **Senha:** teste123  
- **Função:** ADMIN

⚠️ Certifique-se de que o banco de dados esteja rodando antes de executar o script (pode ser local, Docker ou Neon).

Esse usuário pode ser usado para autenticação via API ou interface, de acordo com as permissões definidas no projeto.

---

## 🧹 Lint e formatação

Para verificar erros e manter o padrão de código:

```bash
npm run lint
```

Para formatar automaticamente com Prettier:

```bash
npm run format
```

---

## 🗄️ Banco de Dados

O projeto utiliza o Prisma para modelar o banco de dados PostgreSQL.

- Os IDs são do tipo `CUID`, ideais para sistemas distribuídos;
- Todos os relacionamentos (usuário, projeto, habilidades, stacks, feedbacks) estão devidamente mapeados;
- As migrations estão versionadas e podem ser aplicadas com `prisma migrate dev` ou `prisma migrate deploy`.

---

## 🧠 Outras informações

- O backend utiliza validações com **Zod**;
- As permissões são controladas por função (`role`) e centralizadas em `lib/check-auth.ts`;
- O frontend está estruturado com autenticação via **NextAuth** e integração com a API.

---

## Contributors ✨

Confira nosso arquivo [CONTRIBUTORS.md](./CONTRIBUTORS.md) para conhecer todos os colaboradores incríveis que ajudaram a construir este projeto. Sinta-se à vontade para abrir uma issue ou PR! 💜

Este projeto segue a especificação do [all-contributors](https://github.com/all-contributors/all-contributors). Contribuições de qualquer tipo são bem-vindas!
