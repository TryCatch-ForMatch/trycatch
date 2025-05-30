# API

Rotas da API (Backend) utilizando Next.js API Routes. Cada arquivo representa um endpoint. Ideal para requisições server-side como autenticação, manipulação de dados, webhooks, etc.

# 📁 Pasta `api`

Esta pasta contém as rotas de API do projeto.

## 🔒 Proteção

- As rotas são protegidas por NextAuth, usando JWT.
- O Middleware (`/middleware.ts`) também protege qualquer acesso às rotas `/api/**` exigindo que o usuário esteja autenticado.

## 🔑 Autenticação

- Endpoint de autenticação:  
  `/api/auth/[...nextauth]`  
  Implementado usando NextAuth com Provider de credenciais (email + senha).

- Configuração da autenticação fica centralizada em:  
  `/src/lib/auth.ts`

## 📜 Estrutura das Rotas

- `/api/auth/` → Autenticação (login, logout, session).
- Outras rotas poderão ser criadas seguindo este padrão, e também estarão protegidas.

## 🚀 Observações

- A API usa Prisma como ORM.
- O JWT gerado contém os campos:  
  `id`, `name`, `email`, `avatar`.
