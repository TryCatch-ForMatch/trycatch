# 👤🔒 API User Admin

Esta pasta contém as rotas para administração de usuários do sistema.  
Permite que administradores listem, atualizem e excluam usuários, além de gerenciar permissões e dados sensíveis.

---

## 📁 Estrutura da pasta
```
├── user-admin/
    ├── [id]/route.ts     
    └── route.ts
```
---

## 📚 Endpoints CRUD

| Método   | Rota                    | Descrição                                         | Campos principais                                 |
|----------|-------------------------|---------------------------------------------------|---------------------------------------------------|
| GET      | `/api/user-admin`       | Lista todos os usuários (admin)                   | `id`, `name`, `email`, `avatar`, `role`, `createdAt`, `isActive` |
| POST     | `/api/user-admin`       | Cria um novo usuário (admin)                      | `name`, `email`, `password`, `avatar`, `role`, `linkedin`, `github`, `bio`, `skills`       |
| GET      | `/api/user-admin/:id`   | Busca um usuário específico pelo ID (admin)       | `id`, `name`, `email`, `avatar`, `role`, `linkedin`, `github`, `bio`, `skills`, `createdAt`, `isActive` |
| PUT      | `/api/user-admin/:id`   | Atualiza um usuário existente (admin)             | `name`, `email`, `avatar`, `role`, `linkedin`, `github`, `bio`, `skills`                    |
| DELETE   | `/api/user-admin/:id`   | Remove um usuário pelo ID (admin)                 | -                                                 |

**Campos principais:**
- `id`: Identificador do usuário
- `name`: Nome do usuário
- `email`: Email do usuário
- `password`: Senha (apenas para criação)
- `avatar`: URL do avatar do usuário
- `role`: Papel do usuário (ex: ADMIN, USER)
- `linkedin`: URL linkedin do usuário
- `github`: URL github do usuário
- `bio`: Biografia do usuário
- `isActive`: Status de ativação do usuário
- `createdAt`: Data de criação do usuário
