# 🔐 API Auth

Rotas de autenticação da API. 
Cada subpasta representa um endpoint relacionado à autenticação e registro de usuários.

---

## 📁 Estrutura da pasta

```
├── auth/
    ├── [...nextauth]/route.ts
    ├── register/route.ts
    └── signup/route.ts
```

---

## 📝 Descrição dos arquivos

### `[...nextauth]/route.ts`
- **Função:** Implementa o endpoint principal de autenticação usando **NextAuth**.
- **Recursos:** Login, logout, sessão, integração com provedores, geração de JWT.
- **Uso:** `/api/auth/[...nextauth]`
- **Rotas automáticas geradas pelo NextAuth:**
  - `/api/auth/callback/credentials` (login via POST)
  - `/api/auth/csrf` (obtenção do CSRF token)

### `register/route.ts`
- **Função:** Endpoint para registro de novos usuários.
- **Recursos:** Recebe dados do usuário, valida convite, direciona para signup.
- **Uso:** `/api/auth/register`

### `signup/route.ts`
- **Função:** Endpoint para criação de usuário a partir de convite.
- **Recursos:** Valida código de convite, cria usuário, associa convite ao novo usuário.
- **Uso:** `/api/auth/signup`

---

## 🧪 Testando login via Postman

Para autenticar via credenciais:

1. **Obtenha o CSRF token:**
   ```
   GET http://localhost:3000/api/auth/csrf
   ```
   O valor estará em `csrfToken` no JSON de resposta.

2. **Faça login:**
   ```
   POST http://localhost:3000/api/auth/callback/credentials
   ```
   Corpo da requisição:
   ```json
   {
     "email": "email@email.com",
     "password": "senha123",
     "redirect": false,
     "csrfToken": "a246f2af66d7365778339600b0b485888a8ea46b57c6684b09d3c2723e532b01"
   }
   ```
   