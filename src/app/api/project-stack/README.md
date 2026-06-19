# 🛠️ API Project Stack

Esta pasta contém as rotas para gerenciar as stacks (tecnologias) associadas a projetos.  
Permite criar, listar, atualizar e excluir associações de stacks em projetos.

---

## 📁 Estrutura da pasta

```
├── project-stack/
    ├── [id]/route.ts    
    └── route.ts
```

project-stack/ route.ts [id]/route.ts

---

## 📚 Endpoints CRUD

| Método   | Rota                         | Descrição                                         | Campos principais                                 |
|----------|------------------------------|---------------------------------------------------|---------------------------------------------------|
| GET      | `/api/project-stack`         | Lista todas as associações de stack a projetos    | `id`, `projectId`, `stackId`, `percentage`, `createdAt` |
| POST     | `/api/project-stack`         | Cria uma nova associação de stack a projeto       | `projectId`, `stackId`, `percentage`              |
| GET      | `/api/project-stack/:id`     | Busca uma associação específica pelo ID           | `id`, `projectId`, `stackId`, `percentage`, `createdAt` |
| PATCH    | `/api/project-stack/:id`     | Atualiza uma associação existente                 | `stackId`, `percentage`                           |
| DELETE   | `/api/project-stack/:id`     | Remove uma associação pelo ID                     | -                                                 |

**Campos principais:**
- `id`: Identificador da associação
- `projectId`: ID do projeto relacionado
- `stackId`: ID da stack associada ao projeto
- `percentage`: Percentual de uso da stack no projeto
- `createdAt`: Data de criação da associação
