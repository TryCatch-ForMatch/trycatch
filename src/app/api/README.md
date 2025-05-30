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

  # API - User

Esta API é responsável pelo gerenciamento dos usuários.

## Rotas Disponíveis

### 📄 `GET /api/user`

- **Descrição:** Lista todos os usuários.
- **Resposta:** Lista de usuários cadastrados.

### ➕ `POST /api/user`

- **Descrição:** Cria um novo usuário.
- **Body esperado:**

```json
{
  "name": "Nome do usuário",
  "email": "email@exemplo.com",
  "password": "senha123",
  "avatar": "https://link-do-avatar.com",
  "linkedin": "https://linkedin.com/in/usuario",
  "github": "https://github.com/usuario",
  "bio": "Descrição sobre o usuário"
}
```

### 🔍 GET /api/user/:id

- **Descrição:** Retorna os dados de um usuário específico.

- **Parâmetros:**

id: ID do usuário.

### ✏️ PUT /api/user/:id

- **Descrição:** Atualiza os dados de um usuário.

- **Parâmetros:**

id: ID do usuário.

**Body permitido:**

```json
{
  "name": "Novo nome",
  "avatar": "https://novo-avatar.com",
  "linkedin": "https://linkedin.com/in/usuario",
  "github": "https://github.com/usuario",
  "bio": "Nova bio"
}
```

### ❌ DELETE /api/user/:id

- **Descrição:** Deleta um usuário específico.

- **Parâmetros:**

id: ID do usuário.

## 🗂️ Tecnologias e Dependências

Prisma ORM

PostgreSQL

Next.js (Route Handlers App Router)

TypeScript

## 🔗 Dependências do arquivo

@/lib/prisma: Instância do Prisma Client.

🚩 Observações
A senha é criptografada utilizando bcrypt no fluxo de autenticação, mas na criação via API não é criptografada diretamente (somente no login). Para segurança, a criação de usuário diretamente pela API não deve ser pública ou deve ter uma regra específica.
