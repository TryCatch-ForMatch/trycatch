# 🗂️ API Upload

Esta pasta contém as rotas para upload de avatar de usuário, utilizando o Cloudinary.

---

## 📁 Estrutura da pasta
```
├── upload/
    └── avatar/route.ts
```
---

## 📚 Endpoints

| Método   | Rota                   | Descrição                       | Campos principais         |
|----------|------------------------|---------------------------------|--------------------------|
| POST     | `/api/upload/avatar`   | Faz upload de avatar do usuário | `file` (imagem), `userId`|

**Campos principais:**
- `file`: Arquivo de imagem enviado para ser usado como avatar
- `userId`: Identificador do usuário (pode ser obtido da sessão/autenticação)

---

## 🔒 Observações

- A rota pode exigir autenticação.
- O arquivo é validado antes do upload (tipo, tamanho, etc).
- O avatar é salvo no Cloudinary e o caminho é atualizado no perfil do usuário.
