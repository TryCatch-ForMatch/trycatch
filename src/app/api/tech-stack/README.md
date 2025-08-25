# 🛠️ API Tech Stack

Esta pasta contém as rotas para gerenciar stacks de tecnologia do sistema.  
Permite criar, listar, atualizar, excluir e contar stacks cadastradas.

---

## 📁 Estrutura da pasta
```
├── tech-stack/
    ├── [id]/route.ts
    ├── count/route.ts    
    └── route.ts
```
---

## 📚 Endpoints CRUD

| Método   | Rota                      | Descrição                                 | Campos principais                      |
|----------|---------------------------|-------------------------------------------|----------------------------------------|
| GET      | `/api/tech-stack`         | Lista todas as stacks                     | `id`, `name`, `createdAt`, `updatedAt` |
| POST     | `/api/tech-stack`         | Cria uma nova stack                       | `name`                                 |
| GET      | `/api/tech-stack/:id`     | Busca uma stack específica pelo ID         | `id`, `name`, `createdAt`, `updatedAt` |
| PUT      | `/api/tech-stack/:id`     | Atualiza uma stack existente               | `name`                                 |
| DELETE   | `/api/tech-stack/:id`     | Remove uma stack pelo ID                   | -                                      |
| GET      | `/api/tech-stack/count`   | Retorna a quantidade total de stacks       | `count`                                |

**Campos principais:**
- `id`: Identificador da stack
- `name`: Nome da stack de tecnologia
- `createdAt`: Data de criação da stack
- `updatedAt`: Data da última atualização da stack
