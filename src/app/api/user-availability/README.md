# 🗓️ API User Availability

Esta pasta contém as rotas para gerenciar a disponibilidade de usuários.  
Permite criar, listar, atualizar, excluir e consultar a disponibilidade de horários dos usuários do sistema.

---

## 📁 Estrutura da pasta
```
├── user-availability/
    ├── [id]/route.ts
    ├── me/route.ts      
    └── route.ts
```
---

## 📚 Endpoints CRUD e utilitários

| Método   | Rota                              | Descrição                                         | Campos principais                                 |
|----------|-----------------------------------|---------------------------------------------------|---------------------------------------------------|
| GET      | `/api/user-availability`          | Lista todas as disponibilidades                   | `id`, `userId`, `availabilities`, `mentor`, `createdAt`     |
| POST     | `/api/user-availability`          | Cria uma nova disponibilidade                     | `userId`, `availabilities`, `mentor`                        |
| GET      | `/api/user-availability/:id`      | Busca uma disponibilidade específica pelo ID      | `id`, `userId`, `availabilities`, `mentor`, `createdAt`     |
| PUT      | `/api/user-availability/:id`      | Atualiza uma disponibilidade existente            | `availabilities`, `mentor`                                  |
| DELETE   | `/api/user-availability/:id`      | Remove uma disponibilidade pelo ID                | -                                                 |
| GET      | `/api/user-availability/me`       | Retorna a disponibilidade do usuário autenticado  | `id`, `userId`, `availabilities`, `mentor`, `createdAt`     |

**Campos principais:**
- `id`: Identificador da disponibilidade
- `userId`: ID do usuário
- `availabilities`: Lista de horários disponíveis (ex: dia da semana, hora de início e fim)
- `isMentor`: Booleano se é mentor
- `createdAt`: Data de criação do registro
