# 🛠️ API Team Project

Esta pasta contém as rotas para gerenciar projetos em equipe.  
Permite criar, listar, atualizar, excluir, contar e resumir projetos cadastrados no sistema.

---

## 📁 Estrutura da pasta
```
├── team-project/
    ├── [id]/route.ts
    ├── count/route.ts
    ├── summary/route.ts
    └── route.ts
```

---

## 📚 Endpoints CRUD e utilitários

| Método   | Rota                          | Descrição                                         | Campos principais                                 |
|----------|-------------------------------|---------------------------------------------------|---------------------------------------------------|
| GET      | `/api/team-project`           | Lista todos os projetos                           | `id`, `name`, `description`, `deadline`, `skills`, `stacks`, `ownerId`, `totalValue`, `status`, `createdAt` |
| POST     | `/api/team-project`           | Cria um novo projeto                              | `name`, `description`, `deadline`, `skills`, `stacks`, `ownerId`, `totalValue`, `status`                    |
| GET      | `/api/team-project/:id`       | Busca um projeto específico pelo ID               | `id`, `name`, `description`, `deadline`, `skills`, `stacks`, `ownerId`, `totalValue`, `status`, `createdAt` |
| PUT      | `/api/team-project/:id`       | Atualiza um projeto existente                     | `name`, `description`, `deadline`, `skills`, `stacks`, `totalValue`, `status`                               |
| DELETE   | `/api/team-project/:id`       | Remove um projeto pelo ID                         | -                                                 |
| GET      | `/api/team-project/count`     | Retorna a quantidade total de projetos            | `count`                                           |
| GET      | `/api/team-project/summary`   | Retorna um resumo dos projetos                    | `id`, `name`, `description`, `deadline`, `skills`, `stack-status (stacksFilled, stacksTotal)`,  |

**Campos principais:**
- `id`: Identificador do projeto
- `name`: Nome do projeto
- `description`: Descrição do projeto
- `deadline`: Data limite do projeto
- `skill`: Skills do projeto
- `stack`: Stacks do projeto
- `ownerId`: ID do usuário proprietário
- `totalValue`: Valor total do projeto
- `status`: Status do projeto (ex: ativo, concluído)
- `createdAt`: Data de criação do projeto
