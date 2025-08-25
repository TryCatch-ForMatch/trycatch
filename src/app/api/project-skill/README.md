# 🛠️ API Project Skill

Esta pasta contém as rotas para gerenciar as habilidades (skills) associadas a projetos.  
Permite criar, listar e excluir associações de skills em projetos.

---

## 📁 Estrutura da pasta
```
├── project-skill/
    ├── [id]/route.ts    
    └── route.ts
```
---

## 📚 Endpoints CRUD

| Método   | Rota                        | Descrição                                         | Campos principais                                 |
|----------|-----------------------------|---------------------------------------------------|---------------------------------------------------|
| GET      | `/api/project-skill`        | Lista todas as associações de skill a projetos    | `id`, `projectId`, `skillId`, `createdAt`         |
| POST     | `/api/project-skill`        | Cria uma nova associação de skill a projeto       | `projectId`, `skillId`                            |
| GET      | `/api/project-skill/:id`    | Busca uma associação específica pelo ID           | `id`, `projectId`, `skillId`, `createdAt`         |                                    |
| DELETE   | `/api/project-skill/:id`    | Remove uma associação pelo ID                     | -                                                 |

**Campos principais:**
- `id`: Identificador da associação
- `projectId`: ID do projeto relacionado
- `skillId`: ID da skill associada ao projeto
- `createdAt`: Data de criação da associação
