# 🚀 API

Rotas da API (Backend) utilizando **Next.js API Routes** com **Route Handlers** (`app/api/`). Cada arquivo representa um endpoint RESTful.

Ideal para requisições server-side como autenticação, manipulação de dados, integrações, etc.

---

# 📁 Estrutura da pasta `/api`

A pasta contém todas as rotas de API do projeto, organizadas por recurso.  
Cada subpasta representa um grupo de endpoints, e arquivos `route.ts` implementam os handlers HTTP.

```
/api/
├── auth/
│   ├── [...nextauth]/route.ts
│   ├── register/route.ts
│   └── signup/route.ts
├── feedback/
│   ├── route.ts
│   └── [id]/route.ts
├── invite/
│   ├── route.ts
│   ├── [id]/route.ts
│   └── count/route.ts
├── project-skill/
│   ├── route.ts
│   └── [id]/route.ts
├── project-stack/
│   ├── route.ts
│   └── [id]/route.ts
├── skill/
│   ├── route.ts
│   ├── [id]/route.ts
│   └── count/route.ts
├── stack-taken/
│   ├── route.ts
│   └── [id]/route.ts
├── team-project/
│   ├── route.ts
│   ├── [id]/route.ts
│   ├── count/route.ts
│   └── summary/route.ts
├── tech-stack/
│   ├── route.ts
│   ├── [id]/route.ts
│   └── count/route.ts
├── upload/
│   └── avatar/route.ts
├── user/
│   ├── route.ts
│   ├── [id]/route.ts
│   ├── count/route.ts
│   └── me/route.ts
├── user-admin/
│   ├── route.ts
│   └── [id]/route.ts
├── user-availability/
│   ├── route.ts
│   ├── [id]/route.ts
│   └── me/route.ts
└── user-skill/
    ├── route.ts
    ├── [id]/route.ts
    └── me/route.ts
```

---

# 🔒 Proteção e Autenticação

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

# 🗺️ 📜 Principais Rotas e Funções

| Rota                        | Descrição                                      |
| --------------------------- | -----------------------------------------------|
| `/api/auth/`                | Autenticação (login, logout, sessão)           |
| `/api/auth/register`        | Registro de usuário                            |
| `/api/auth/signup`          | Criação de usuário                             |
| `/api/user/`                | GET/PUT/DELETE de usuários                     |
| `/api/user-admin/`          | Administração de usuários                      |
| `/api/user-availability/`   | Disponibilidade de usuários                    |
| `/api/user-skill/`          | Habilidades do usuário                         |
| `/api/skill/`               | CRUD de skills                                 |
| `/api/tech-stack/`          | CRUD de stacks                                 |
| `/api/team-project/`        | CRUD de projetos                               |
| `/api/project-skill/`       | Skills associadas ao projeto                   |
| `/api/project-stack/`       | Stacks associadas ao projeto                   |
| `/api/stack-taken/`         | Stacks assumidas por usuário                   |
| `/api/invite/`              | Convites de usuário                            |
| `/api/feedback/`            | Feedbacks entre usuários                       |
| `/api/upload/avatar`        | Upload de avatar                               |

Rotas dinâmicas como `/api/user/:id`, `/api/skill/:id`, etc, estão implementadas nas subpastas `[id]`.

---

# 🚩 Observações Importantes

- A API usa **Prisma ORM**.
- Banco de dados: **PostgreSQL**.
- Autenticação via **NextAuth** com estratégia JWT.
- As senhas são criptografadas no processo de autenticação usando **bcrypt**.
- O JWT gerado contém os campos:  
  `id`, `name`, `email`, `avatar`.

---

# 🗂️ Tecnologias e Dependências

- Next.js (`app/api` e Route Handlers)
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth (autenticação)
- bcrypt (criptografia de senha)
