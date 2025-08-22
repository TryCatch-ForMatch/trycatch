# 🛠️ API Stack Taken

Esta pasta contém as rotas para gerenciar as stacks assumidas por usuários em projetos.  
Permite criar, listar, atualizar e excluir registros de stacks que foram assumidas por algum usuário.

---

## 📁 Estrutura da pasta
```
├── stack-taken/
    ├── [id]/route.ts   
    └── route.ts
```
---

## 📚 Endpoints CRUD

| Método   | Rota                      | Descrição                                         | Campos principais                                 |
|----------|---------------------------|---------------------------------------------------|---------------------------------------------------|
| GET      | `/api/stack-taken`        | Lista todas as stacks assumidas                   | `id`, `projectId`, `stackId`, `userId`, `createdAt` |
| POST     | `/api/stack-taken`        | Cria um novo registro de stack assumida           | `projectId`, `stackId`, `userId`                  |
| GET      | `/api/stack-taken/:id`    | Busca um registro específico pelo ID              | `id`, `projectId`, `stackId`, `userId`, `createdAt` |
| PUT      | `/api/stack-taken/:id`    | Atualiza um registro existente                    | `stackId`, `userId`                               |
| DELETE   | `/api/stack-taken/:id`    | Remove um registro pelo ID                        | -                                                 |

**Campos principais:**
- `id`: Identificador do registro
- `projectId`: ID do projeto relacionado
- `stackId`: ID da stack assumida
- `userId`: ID do usuário que assumiu a stack
- `createdAt`: Data de criação do registro
