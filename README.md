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

---

## ❤️ Bora construir juntos

Nosso foco não é só código. É treino real de como trabalhar em equipe, ter responsabilidade e evoluir juntos. Por isso, foco, disciplina e comprometimento, para criarmos uma vitrine real do que sabemos fazer.

---

## 🙌 Como contribuir?

Confira o [Guia de Contribuição](./CONTRIBUTING.md) para entender o fluxo de trabalho, regras, padrões e combinados da comunidade.

## ⚙️ Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-org/trycatch.git
cd trycatch
```

2. Instale as dependências:

```bash
npm install
```

3. Configure seu arquivo .env na raiz do projeto (exemplo):

```env
DATABASE_URL="postgresql://trycatch_user:sua_senha@localhost:5432/trycatch_db"
```

4. Rode as migrations do Prisma:

```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

6. Abra http://localhost:3000 no navegador.

## 🧹 Lint e formatação

Para rodar o ESLint e garantir o padrão de código:

```bash
npm run lint
```

Para formatar o código automaticamente com Prettier:

```bash
npm run format
```

## 🗄️ Banco de Dados

Modelagem inicial criada com Prisma.

- IDs usando `CUID` para maior segurança e escalabilidade.
- Relacionamentos mapeados conforme regras de negócio.
- Estrutura pronta para suportar autenticação, projetos, stacks, skills e feedbacks.
