# 📝 API Feedback

Esta pasta contém as rotas de feedback entre usuários.       
Permite criar e listar feedbacks relacionados a projetos e usuários.

---

## 📁 Estrutura da pasta
```
├── feedback/
    ├── [id]/route.ts
    └── route.ts
```
---

## 📚 Endpoints CRUD

| Método   | Rota                | Descrição                                      |
|----------|---------------------|------------------------------------------------|
| GET      | `/api/feedback`     | Lista todos os feedbacks                       |
| POST     | `/api/feedback`     | Cria um novo feedback                          |
| GET      | `/api/feedback/:id` | Busca um feedback específico pelo ID           |

**Campos principais:**
- `id`: Identificador do feedback
- `projectId`: Projeto relacionado ao feedback
- `fromUserId`: Usuário que enviou o feedback
- `toUserId`: Usuário que recebeu o feedback
- `rating`: Nota ou avaliação (ex: número de estrelas)
- `comment`: Comentário textual do feedback
- `createdAt`: Data de criação do feedback
