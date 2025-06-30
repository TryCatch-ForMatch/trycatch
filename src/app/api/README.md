# 🚀 API

Rotas da API (Backend) utilizando **Next.js API Routes** com **Route Handlers** (`app/api/`). Cada arquivo representa um endpoint RESTful.

Ideal para requisições server-side como autenticação, manipulação de dados, integrações, etc.

---

# 📁 Pasta `/api`

Esta pasta contém todas as rotas de API do projeto.

---

## 🔒 Proteção e Autenticação

- As rotas são protegidas por **NextAuth** utilizando **JWT**.
- O **Middleware** (`/middleware.ts`) protege o acesso às rotas `/api/**`, exigindo que o usuário esteja autenticado.

### 🔑 Endpoint de autenticação:

```
/api/auth/[...nextauth]
```

- Implementado usando **NextAuth** com Provider de credenciais (email + senha).
- Configurações centralizadas no arquivo:

```
/src/lib/auth.ts
```

---

# 🗺️ 📜 Estrutura das Rotas

| Rota                | Descrição                                      |
| ------------------- | -----------------------------------------------|
| `/api/auth/`        | Autenticação (login, logout, sessão)           |
| `/api/signup/`      | POST de usuários                               |
| `/api/user/`        | GET/PUT/DELETE de usuários                     |
| `/api/skill/`       | CRUD de skills                                 |
| `/api/tech-stack/`  | CRUD de stacks                                 |
| `/api/team-project/`| CRUD de projetos                               |

---

## 📦 Gerenciamento de parâmetros na URL (`:id`)

Com a atualização do Next.js (13.4+ até 15), rotas dinâmicas como `/api/user/:id` ou `/api/team-project/:id` **não recebem mais os parâmetros diretamente como `{ params }`** nas funções dos handlers (`GET`, `PUT`, `DELETE`).

### ✅ Nova abordagem:

Criamos uma função utilitária chamada `getIdFromRequest` para capturar o `id` diretamente da URL da requisição.

### 🔗 Local da função:

```
/src/utils/url.ts
```

### 🔧 Funcionamento da função:

```ts
import { NextRequest } from 'next/server';

export function getIdFromRequest(request: NextRequest) {
  const id = request.nextUrl.pathname.match(/\/([^/]+)$/)?.[1];
  if (!id) {
    throw new Error('ID não encontrado na URL');
  }
  return id;
}
```

### 🚩 Como usar nos handlers:

```ts
import { getIdFromRequest } from '@/utils/url';

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);
  // restante da lógica...
}
```

Isso garante que qualquer rota que use `/:id` funciona corretamente e de forma consistente.

---

## 🚀 Observações Importantes

- A API usa **Prisma ORM**.
- Banco de dados: **PostgreSQL**.
- Autenticação via **NextAuth** com estratégia JWT.
- As senhas são criptografadas no processo de autenticação usando **bcrypt**.
- O JWT gerado contém os campos:  
  `id`, `name`, `email`, `avatar`.

---

# 🔗 Testes com Postman

### ✅ Obter CSRF Token

```http
GET http://localhost:3000/api/auth/csrf
```

**Resposta:**

```json
{
  "csrfToken": "token-aqui"
}
```

### ✅ Realizar Login

```http
POST http://localhost:3000/api/auth/callback/credentials
```

**Headers:**

```
Content-Type: application/json
Accept: application/json
```

**Body:**

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha-segura",
  "csrfToken": "token-do-passo-anterior",
  "redirect": false
}
```

---

# 🧠 API - User

## 📄 `GET /api/user`

- Lista todos os usuários.

## ➕ `POST /api/signup`

- Cria um novo usuário.

**Body esperado:**

```json
{
  "name": "Fulano",
  "email": "fulano@email.com",
  "password": "senha123",
  "avatar": null,
  "linkedin": "https://linkedin.com/in/fulano",
  "github": "https://github.com/fulano",
  "bio": "Desenvolvedor Fullstack",
  "skills": ["skillId1", "skillId2"]
}
```

## 🔍 `GET /api/user/:id`

- Retorna os dados de um usuário específico.

## ✏️ `PUT /api/user/:id`

- Atualiza os dados de um usuário.

**Body permitido:**

```json
{
  "name": "Novo Nome",
  "password": "novaSenha",
  "avatar": "https://avatar.com",
  "linkedin": "https://linkedin.com/in/usuario",
  "github": "https://github.com/usuario",
  "bio": "Nova bio",
  "skills": ["skillId1", "skillId2"]
}
```

## ❌ `DELETE /api/user/:id`

- Deleta um usuário específico.

---

# 🔧 API - Skill

| Método | Rota                  | Descrição           |
| ------ | ---------------------- | ------------------ |
| GET    | `/api/skill`           | Lista todas        |
| POST   | `/api/skill`           | Cria uma nova      |
| GET    | `/api/skill/:id`       | Retorna uma        |
| PATCH  | `/api/skill/:id`       | Atualiza           |
| DELETE | `/api/skill/:id`       | Deleta             |

**Exemplo de criação:**

```json
{
  "name": "TypeScript"
}
```

---

# 🏗️ API - Stack

| Método | Rota                        | Descrição          |
| ------ | --------------------------- | ------------------ |
| GET    | `/api/tech-stack`           | Lista todas        |
| POST   | `/api/tech-stack`           | Cria uma nova      |
| GET    | `/api/tech-stack/:id`       | Retorna uma        |
| PATCH  | `/api/tech-stack/:id`       | Atualiza           |
| DELETE | `/api/tech-stack/:id`       | Deleta             |

---

# 🚀 API - Project

| Método | Rota                          | Descrição                 |
| ------ | ----------------------------- | ------------------------- |
| GET    | `/api/team-project`           | Lista todos os projetos   |
| POST   | `/api/team-project`           | Cria um novo projeto      |
| GET    | `/api/team-project/:id`       | Retorna um projeto        |
| PUT    | `/api/team-project/:id`       | Atualiza um projeto       |
| DELETE | `/api/team-project/:id`       | Deleta um projeto         |

## 📄 Exemplo de criação (`POST /api/team-project`):

```json
{
  "ownerId": "userId",
  "name": "Projeto Exemplo",
  "description": "Descrição detalhada",
  "deadline": "2025-12-31T23:59:59.000Z",
  "totalValue": 10000,
  "status": "BUSCANDO",
  "skills": ["skillId1", "skillId2"],
  "stacks": [
    { "stackId": "stackId1", "percentage": 60 },
    { "stackId": "stackId2", "percentage": 40 }
  ]
}
```

## 📄 Exemplo de atualização (`PUT /api/team-project/:id`):

```json
{
  "name": "Novo nome do projeto",
  "description": "Nova descrição",
  "deadline": "2026-01-01T00:00:00.000Z",
  "totalValue": 15000,
  "status": "EM_ANDAMENTO",
  "skills": ["skillId1", "skillId2"],
  "stacks": [
    { "stackId": "stackId1", "percentage": 50 },
    { "stackId": "stackId2", "percentage": 50 }
  ]
}
```

---

# 🗂️ Tecnologias e Dependências

- Next.js (`app/api` e Route Handlers)
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth (autenticação)
- bcrypt (criptografia de senha)

---

# 🚩 Observações de Segurança

- As senhas são criptografadas no login, não diretamente na criação do usuário via API.  
**⚠️ Atenção:** a rota de criação de usuário não deve ser pública, a menos que tenha proteções adicionais.

---
