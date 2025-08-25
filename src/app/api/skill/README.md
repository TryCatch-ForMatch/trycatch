# 🛠️ API Skill

Esta pasta contém as rotas para gerenciar as habilidades (skills) do sistema.  
Permite criar, listar, atualizar, excluir e contar skills cadastradas.

---

## 📁 Estrutura da pasta
```
├── skill/
    ├── [id]/route.ts
    ├── count/route.ts
    └── route.ts
```
---

## 📚 Endpoints CRUD

| Método   | Rota                  | Descrição                                 | Campos principais                      |
|----------|-----------------------|-------------------------------------------|----------------------------------------|
| GET      | `/api/skill`          | Lista todas as skills                     | `id`, `name`, `createdAt`, `updatedAt` |
| POST     | `/api/skill`          | Cria uma nova skill                       | `name`                                 |
| GET      | `/api/skill/:id`      | Busca uma skill específica pelo ID         | `id`, `name`, `createdAt`, `updatedAt` |
| PATCH    | `/api/skill/:id`      | Atualiza uma skill existente               | `name`                                 |
| DELETE   | `/api/skill/:id`      | Remove uma skill pelo ID                   | -                                      |
| GET      | `/api/skill/count`    | Retorna a quantidade total de skills       | `count`                                |

**Campos principais:**
- `id`: Identificador da skill
- `name`: Nome da habilidade
- `createdAt`: Data de criação da skill
- `updatedAt`: Data da última atualização da skill
