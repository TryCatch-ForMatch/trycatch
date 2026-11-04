# Lib

Bibliotecas, serviços e instâncias que são utilizadas em múltiplas partes do projeto, como conexão com banco de dados, Prisma, autenticação, configurações externas e afins.

# 📁 Pasta `lib`

Contém funções utilitárias e configurações centrais.

## 🔑 Arquivos

### **`auth.ts`** → Centraliza as configurações do NextAuth (providers, callbacks, secret, pages, etc.).

- 🚀 Objetivo

- Manter a configuração da autenticação desacoplada da rota `/api/auth`.
- Permite reutilizar `authOptions` tanto no middleware quanto no layout da dashboard e outras funcionalidades server-side.

### **`check-auth.ts`** 

- Objetivo

- Função utilitária que centraliza a verificação de sessão e role (USER, ADMIN ou MENTOR)

### **`validations/`** → Schemas de validação do Zod, um arquivo por domínio.

- Objetivo

- Usar a mesma regra de validação nas rotas da API e nos formulários.
- Padrão em `docs/03 - tecnico/arquitetura/validacao-schemas.md`.
