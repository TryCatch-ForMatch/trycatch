# 👤 API User

Esta pasta contém as rotas para gerenciar usuários do sistema.  
Permite listar, atualizar, excluir, contar usuários e acessar dados do usuário autenticado.

---

## 📁 Estrutura da pasta

```
├── user/
    ├── [id]/route.ts
    ├── count/route.ts
    ├── me/route.ts
    └── route.ts
```
---

## 📚 Endpoints CRUD e utilitários

| Método   | Rota                | Descrição                                         | Campos principais                                 |
|----------|---------------------|---------------------------------------------------|---------------------------------------------------|
| GET      | `/api/user`         | Lista todos os usuários                           | `id`, `name`, `email`, `linkedin`, `github`, `avatar`, `role`, `createdAt` |
| GET      | `/api/user/:id`     | Busca um usuário específico pelo ID               | `id`, `name`, `email`, `avatar`, `linkedin`, `github` |
| PUT      | `/api/user/:id`     | Atualiza um usuário existente                     | `name`, `email`, `avatar`, `linkedin`, `github`, `password`, `bio`                    |
| DELETE   | `/api/user/:id`     | Remove um usuário pelo ID                         | -                                                 |
| GET      | `/api/user/count`   | Retorna a quantidade total de usuários            | `count`                                           |
| GET      | `/api/user/me`      | Retorna os dados do usuário autenticado           | `id`, `name`, `email`, `avatar`, `role`, `linkedin`, `github`, `password`, `bio`, `createdAt` |

**Campos principais:**
- `id`: Identificador do usuário
- `name`: Nome do usuário
- `email`: Email do usuário
- `password`: Senha (apenas para criação)
- `avatar`: URL do avatar do usuário
- `linkedin`: URL linkedin do usuário
- `github`: URL github do usuário
- `bio`: Biografia do usuário
- `createdAt`: Data de criação do usuário
