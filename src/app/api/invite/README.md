# ✉️ API Invite

Esta pasta contém as rotas de convites de usuário.  
Permite criar, listar, atualizar, excluir e contar convites enviados para usuários.

---

## 📁 Estrutura da pasta

```
├── invite/
    ├── [id]/route.ts
    ├── count/route.ts
    └── route.ts
```
---

## 📚 Endpoints CRUD

| Método   | Rota                   | Descrição                                      | Campos principais                                 |
|----------|------------------------|------------------------------------------------|---------------------------------------------------|
| GET      | `/api/invite`          | Lista todos os convites                          | `id`, `email`, `code`, `used`, `createdAt`        |
| POST     | `/api/invite`          | Cria um novo convite                             | `email`                                           |
| GET      | `/api/invite/:id`      | Busca um convite específico pelo ID              | `id`, `email`, `code`, `used`, `createdAt`        |
| PATCH      | `/api/invite/:id`      | Atualiza um convite existente                    | `email`, `used`                                   |
| DELETE   | `/api/invite/:id`      | Remove um convite pelo ID                        | -                                                 |
| GET      | `/api/invite/count`    | Retorna a quantidade total de convites em aberto | `count`                                           |

**Campos principais:**
- `id`: Identificador do convite
- `email`: Email do usuário convidado
- `code`: Código único do convite
- `used`: Indica se o convite já foi utilizado
- `createdAt`: Data de criação do convite
