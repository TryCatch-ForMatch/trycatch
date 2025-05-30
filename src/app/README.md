# App

Pasta onde ficam os arquivos de roteamento e a configuração global do Next.js com App Router. Aqui organizamos as rotas, layouts, providers e arquivos globais do projeto.

# 📁 Pasta `app`

Esta pasta segue o padrão de roteamento do Next.js App Router (`app/`).

## 📜 Estrutura

- **`/dashboard`** → Rotas privadas. Protegidas por Middleware e validação server-side via `getServerSession()`.
- **`/login` e `/portfolio`** → Rotas públicas.
- **`/api`** → API routes internas protegidas por NextAuth.

## 🔐 Autenticação e Proteção

- Utiliza NextAuth com middleware (`/src/middleware.ts`) que protege as rotas `/dashboard/**` e `/api/**`.
- O layout da dashboard (`/app/dashboard/layout.tsx`) também possui proteção adicional, checando a sessão no server-side.

## 🚀 Referências importantes

- **Autenticação:** Centralizada em `/lib/auth.ts`
- **Middlewares:** Definidos em `/middleware.ts`
