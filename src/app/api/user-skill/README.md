# 🧑‍💻 API User Skill

Esta pasta contém as rotas para gerenciar as habilidades (skills) associadas aos usuários.  
Permite criar, listar, excluir e consultar as skills dos usuários do sistema.

---

## 📁 Estrutura da pasta
```
├── user-skill/
    ├── [id]/route.ts
    ├── me/route.ts      
    └── route.ts
```
---

## 📚 Endpoints CRUD e utilitários

| Método   | Rota                          | Descrição                                         | Campos principais                                 |
|----------|-------------------------------|---------------------------------------------------|---------------------------------------------------|
| GET      | `/api/user-skill`             | Lista todas as associações de skill a usuários    | `id`, `userId`, `skillId`, `createdAt`            |
| POST     | `/api/user-skill`             | Cria uma nova associação de skill a usuário       | `userId`, `skillId`                               |
| GET      | `/api/user-skill/:id`         | Busca uma associação específica pelo ID           | `id`, `userId`, `skillId`, `createdAt`            |
| DELETE   | `/api/user-skill/:id`         | Remove uma associação pelo ID                     | -                                                 |
| GET      | `/api/user-skill/me`          | Retorna as skills do usuário autenticado          | `id`, `userId`, `skillId`, `createdAt`            |

**Campos principais:**
- `id`: Identificador da associação
- `userId`: ID do usuário relacionado
- `skillId`: ID da skill associada ao usuário
- `createdAt`: Data de criação da associação
