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

# Testes Postman

## Obter Token CSRF

```http
GET http://localhost:3000/api/auth/csrf
```

### Resposta de Sucesso (200 OK):

```json
{
  "csrfToken": "seu-token-csrf-aqui"
}
```

Guarde este csrfToken para o próximo passo.

## Realizar Login

```htt
POST http://localhost:3000/api/auth/callback/credentials
```

Headers:
Content-Type: application/json
Accept: application/json

```body
{
  "email": "usuario@exemplo.com",
  "password": "senha-segura",
  "csrfToken": "token-obtido-no-passo-1",
  "redirect": false
}
```

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
  "name": "Fulano",
  "email": "fulano@email.com",
  "password": "senha123",
  "avatar": null,
  "linkedin": "https://linkedin.com/in/fulano",
  "github": "https://github.com/fulano",
  "bio": "Desenvolvedor fullstack",
  "skills": ["skillId1", "skillId2"]
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
  "password": "senha123",
  "avatar": "https://novo-avatar.com",
  "linkedin": "https://linkedin.com/in/usuario",
  "github": "https://github.com/usuario",
  "bio": "Nova bio",
  "skills": ["skillId1", "skillId2"]

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

## API Skill
Rotas para gerenciamento de skills.

### Listar skills

- **GET** `/api/skill`

### Criar skill

- **POST** `/api/skill`

```json
{
  "name": "TypeScript"
}
```

### Obter uma skill

- **GET** `/api/skill/[id]`

Atualizar uma skill

- **PATCH** `/api/skill/[id]`

```json
{
  "name": "JavaScript"
}
```

### Deletar uma skill

- **DELETE** `/api/skill/[id]`

# API - Stack

Rotas para gerenciamento de stacks.

## Endpoints

### Listar stacks

- **GET** `/api/stack`

### Criar stack

- **POST** `/api/stack`

```json
{
  "name": "Front-End"
}
```

### Obter uma stack

- **GET** `/api/stack/[id]`

### Atualizar uma stack

- **PATCH** `/api/stack/[id]`

```json
{
  "name": "Back-End"
}
```

### Deletar uma stack

- **DELETE** `/api/stack/[id]`

# API - Project

Esta API é responsável pelo gerenciamento dos projetos.

## Rotas Disponíveis

- **GET** `/api/project`

- **Descrição:** Lista todos os projetos cadastrados.
- **Resposta:** Lista de projetos.

### ➕ `POST /api/project`

- **Descrição:** Cria um novo projeto.
- **Body esperado:**

```json
{
  "ownerId": "userId",
  "name": "Projeto Exemplo",
  "description": "Descrição detalhada do projeto",
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

- **GET** `/api/project/:id`
- **Descrição:** Retorna os dados de um projeto específico.

- **Parâmetros:**

id: ID do projeto.

- **PUT** `/api/project/:id`
- **Descrição:** Atualiza os dados de um projeto.

- **Parâmetros:**
id: ID do projeto.

**Body esperado:**

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

- **DELETE** `/api/project/:id`
- **Descrição:** Deleta um projeto específico.

- **Parâmetros:** 
id: ID do projeto.
