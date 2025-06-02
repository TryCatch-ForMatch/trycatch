# TryCatch For Match - Plataforma de Organização de Projetos Colaborativos

## 🚀 Sobre o projeto

TryCatch For Match é a nossa primeira plataforma colaborativa, feita para organizar projetos, conectar pessoas, gerar portfólios reais e criar um ambiente de desenvolvimento que simula o mercado. Aqui praticamos **comprometimento, disciplina e colaboração.**

Este projeto é mais que código — é um laboratório para aprendermos juntos, nos apoiarmos e desenvolvermos habilidades técnicas e comportamentais essenciais para qualquer profissional de tecnologia.

---

## 🔥 Objetivo

- Construir uma plataforma web onde:
  - Membros podem criar projetos internos.
  - Dividir tarefas de acordo com as habilidades.
  - Realizar "match" entre tarefas e membros.
  - Gerar um histórico de participação e colaboração.

---

## 🏗️ Stack do projeto

- **Frontend:** Next.js + TypeScript + TailwindCSS
- **Backend:** API Routes do Next.js com TypeScript + Prisma + PostgreSQL
- **Banco:** PostgreSQL (via Prisma ORM)
- **Design:** Figma
- **Controle de versão:** Git + GitHub
- **Kanban:** GitHub Projects (cards por tarefa)
- **Ambiente:** Docker + Docker Compose (opcional para rodar em container)

---

## ❤️ Bora construir juntos

Nosso foco não é só código. É treino real de como trabalhar em equipe, ter responsabilidade e evoluir juntos. Por isso, foco, disciplina e comprometimento, para criarmos uma vitrine real do que sabemos fazer.

---

## 🙌 Como contribuir?

Confira o [Guia de Contribuição](./CONTRIBUTING.md) para entender o fluxo de trabalho, regras, padrões e combinados da comunidade.

---

## ⚙️ Como rodar localmente (sem Docker)

1. Clone o repositório:

```bash
git clone https://github.com/TryCatch-ForMatch/trycatch.git
cd trycatch
```

2. Instale as dependências:

```bash
npm install
```

3. Configure seu arquivo `.env` na raiz do projeto (exemplo):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/trycatch_db"
```

4. Rode as migrations do Prisma:

```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

6. Acesse [http://localhost:3000](http://localhost:3000)

---

## 🐳 Como rodar com Docker

1. Configure seu arquivo `.env` (exemplo):

```env
# Banco rodando no Docker
DATABASE_URL="postgresql://postgres:postgres@db:5432/trycatch_db"

# NEXTAUTH configs
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_secret_aqui

# Banco
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=trycatch_db
POSTGRES_PORT=5555
```

2. Rode os containers:

```bash
docker-compose up --build
```

3. Acesse [http://localhost:3000](http://localhost:3000)

4. Para aplicar as migrations dentro do container (uma única vez):

```bash
docker-compose exec app npx prisma migrate deploy
```

> ✅ O banco ficará acessível localmente na porta `5555` se desejar acessar por uma interface como DBeaver, TablePlus ou Prisma Studio.

Para acessar o Prisma Studio:

```bash
docker-compose exec app npx prisma studio
```

---

## 🧹 Lint e formatação

Para rodar o ESLint e garantir o padrão de código:

```bash
npm run lint
```

Para formatar o código automaticamente com Prettier:

```bash
npm run format
```

---

## 🗄️ Banco de Dados

Modelagem inicial criada com Prisma.

- IDs usando `CUID` para maior segurança e escalabilidade.
- Relacionamentos mapeados conforme regras de negócio.
- Estrutura pronta para suportar autenticação, projetos, stacks, skills e feedbacks.

---

## 🔗 Links Importantes

- Documentação Prisma: https://www.prisma.io/docs
- Documentação Next.js: https://nextjs.org/docs
- Figma do projeto: [Link aqui se disponível]
- Kanban no GitHub Projects: [Link aqui se disponível]

---

## 🛠️ Status

🚧 Projeto em desenvolvimento, aberto para contribuições.
