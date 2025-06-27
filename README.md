# TryCatch For Match - Plataforma de Organização de Projetos Colaborativos

## 🚀 Sobre o projeto

**TryCatch For Match** é uma plataforma colaborativa desenvolvida para organizar projetos, conectar pessoas, gerar portfólios reais e criar um ambiente que simula o mercado de trabalho. Aqui praticamos **comprometimento, disciplina e colaboração.**

Mais do que apenas código, este projeto é um laboratório de aprendizado coletivo, onde evoluímos juntos tanto em habilidades técnicas quanto comportamentais.

---

## 🔥 Objetivo

- Construir uma plataforma web onde:
  - Membros possam criar e gerenciar projetos internos;
  - As tarefas sejam divididas com base em habilidades técnicas;
  - O sistema faça "match" entre tarefas e membros com perfis compatíveis;
  - Um histórico de colaboração seja gerado para portfólios reais.

---

## 🏗️ Stack do Projeto

- **Frontend:** Next.js + TypeScript + TailwindCSS
- **Backend:** API Routes do Next.js + TypeScript + Prisma
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Ambiente de desenvolvimento:** Docker + Docker Compose
- **Design:** Figma
- **Controle de versão:** Git + GitHub
- **Kanban:** GitHub Projects

---

## ❤️ Construção coletiva

Nosso foco é o desenvolvimento real de habilidades: trabalho em equipe, responsabilidade e entrega. Todos os participantes são incentivados a colaborar de forma ativa e comprometida, simulando uma equipe de desenvolvimento profissional.

---

## 🙌 Como contribuir?

Leia o [Guia de Contribuição](./CONTRIBUTING.md) para entender o fluxo de trabalho, boas práticas, padrões e combinados da equipe.

---

## ⚙️ Como rodar localmente

### 🧾 1. Pré-requisitos

- Node.js (versão recomendada: LTS)
- Docker + Docker Compose (caso queira rodar o banco via container)

---

### 📦 2. Clone o repositório

```bash
git clone https://github.com/TryCatch-ForMatch/trycatch.git
cd trycatch
git checkout develop
```

---

### 📥 3. Instale as dependências

```bash
npm install
```

---

### 🔐 4. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com base no exemplo abaixo:

```env
# Se estiver rodando o banco via Docker
DATABASE_URL="postgresql://trycatch_user:trycatch_pass@localhost:5555/trycatch_db"

# Ou, se estiver rodando localmente sem Docker
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/trycatch_db"

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=um-segredo-seguro

JWT_SECRET=um-outro-segredo
```

---

### 🐳 5. Rodando com Docker (banco de dados)

Caso prefira usar Docker para o banco de dados, você pode usar o `docker-compose.yml` incluído no projeto:
Com o Docker Desktop aberto,

```bash
docker-compose up -d
```

Este comando iniciará um container PostgreSQL escutando na porta **5555**. Certifique-se de que essa porta está configurada corretamente no `.env`.

---

### 🔃 6. Rode as migrations do Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

Este comando criará as tabelas no banco e aplicará os schemas definidos no `prisma/schema.prisma`.

---

### ▶️ 7. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Abra o navegador em: [http://localhost:3000](http://localhost:3000)

---

## Criar Usuário Admin para Testes
Para facilitar os testes da API, incluímos um script que cria um usuário administrador no banco de dados.

📥 Como rodar
Após configurar o .env corretamente e rodar as migrations do Prisma, execute:

```bash
npm run seed
```

Esse comando executa o script createTestUser.js, que cria um usuário admin com os seguintes dados:

Email: admin@admin.com

Senha: teste123

Função: ADMIN

⚠️ Certifique-se de que o banco de dados esteja rodando antes de executar o script (pode ser local ou via Docker).

Esse usuário pode ser usado para autenticação via API ou interface, de acordo com as permissões definidas no projeto.

## 🧹 Lint e formatação

Para verificar erros e manter o padrão de código:

```bash
npm run lint
```

Para formatar automaticamente com Prettier:

```bash
npm run format
```

---

## 🗄️ Banco de Dados

O projeto utiliza o Prisma para modelar o banco de dados PostgreSQL.

- Os IDs são do tipo `CUID`, ideais para sistemas distribuídos;
- Todos os relacionamentos (usuário, projeto, habilidades, stacks, feedbacks) estão devidamente mapeados;
- As migrations estão versionadas e podem ser aplicadas com `prisma migrate dev`.

---

## 🧠 Outras informações

- O backend utiliza validações com Zod;
- As permissões são controladas por função (`role`) e centralizadas em `lib/check-auth.ts`;
- O frontend está sendo estruturado com autenticação via NextAuth e integração com a API.

---

> 💡 Dica: Utilize `npx prisma studio` para visualizar o banco de dados em uma interface web.

---

## 📮 Contato

Sinta-se à vontade para abrir uma issue ou PR. Toda ajuda é bem-vinda! 💜
