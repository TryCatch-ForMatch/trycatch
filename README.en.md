# TryCatch 4Match - Collaborative Project Organization Platform

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/github/all-contributors/TryCatch-ForMatch/trycatch?color=ee8449&style=flat-square)](./CONTRIBUTORS.md)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## 🚀 About the project

**TryCatch** is a collaborative platform developed to organize projects, connect people, generate real portfolios and create an environment that simulates the job market. Here we practice **commitment, discipline and collaboration.**

More than just code, this project is a collective learning laboratory, where we evolve together in both technical and behavioral skills.

---

## 🔥 Objective

- Build a web platform where:
- Members can create and manage internal projects;
- Tasks are divided based on technical skills;
- The system “matches” tasks and members with compatible profiles;
- A collaboration history is generated for real portfolios.

---

## 🏗️ Project Stack

- **Frontend:** Next.js + TypeScript + TailwindCSS
- **Backend:** API Routes do Next.js + TypeScript + Prisma
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Development environment:** Docker + Docker Compose or Neon (PostgreSQL in the cloud)
- **Design:** Figma
- **Version control:** Git + GitHub
- **Kanban:** GitHub Projects

---

## ❤️ Collective construction

Our focus is on real skill development: teamwork, responsibility and delivery. All participants are encouraged to collaborate in an active and committed way, simulating a professional development team.

---

## 🙌 How to contribute?

Read the [Contribution Guide](./CONTRIBUTING.md) to understand the team's workflow, best practices, standards, and arrangements.

Also check out our [CONTRIBUTORS.md](./CONTRIBUTORS.md) archive to meet all the amazing contributors who helped build this project. 🚀

---

## ⚙️ How to run locally

### 🧾 1. Prerequisites

- Node.js (v20 ou superior - LTS)
- Docker + Docker Compose (if you want to run the database via container)

---

### 📦 2. Clone the repository

```bash
git clone https://github.com/TryCatch-ForMatch/trycatch.git
cd trycatch
git checkout develop
```

---

### 📥 3. Install dependencies

```bash
npm install
```

---

### 🔐 4. Configure the `.env` file

Create a .env.local file at the root of the project based on the example below (Next.js reads this file automatically and it is already configured not to upload to your GitHub):

```env
# 👉 Option 1: Shared bench (Neon - recommended for the team)
DATABASE_URL="postgresql://neondb_owner:SUA_SENHA_AQUI@ep-autumn-surf-acr8iv80-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# 👉 Option 2: Bank running via local Docker
# DATABASE_URL="postgresql://trycatch_user:trycatch_pass@localhost:5555/trycatch_db"

# 👉 Option 3: Bank running locally without Docker
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/trycatch_db"

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a-safe-secret
JWT_SECRET=another-secret
```

---

### 🐳 5. Choose how to run the database

You have **3 options** for using the PostgreSQL database in the development environment:

✅ **Option 1 – Use shared banking on Neon (recommended)**
No need to install or upload Docker. Just configure the `.env` with the Neon URL and run the migrations normally:

```bash
npx prisma migrate deploy
npm run seed # optional, to create test admin user
```

✅ **Option 2 – Use Docker locally**
If you prefer to run your own PostgreSQL container locally:

```bash
docker-compose up -d
```

This creates a PostgreSQL database accessible at `localhost:5555`.
Then, apply the migrations:

```bash
npx prisma migrate dev
npm run seed
```

✅ **Option 3 – Use local PostgreSQL installed on the machine**
If you already have PostgreSQL installed, just adjust the `DATABASE_URL` to use the default port `5432` and run the migrations normally.

---

### 🔃 6. Rode as migrations do Prisma

Regardless of the option chosen, apply Prisma migrations to create the tables:

```bash
npx prisma generate
npx prism migrate deploy # if using Neon
# or
npx prisma migrate dev # if using Docker/local
```

💡 **Tip:** Use `npx prisma studio` to view the database in a web interface.

---

## 📸 Upload Avatar with Cloudinary

This project uses **[Cloudinary](https://cloudinary.com)** to store and optimize users' avatars.
It is automatically uploaded to Cloudinary, and the image URL is saved in the database.

---

### 📝 Step 1: Create a free Cloudinary account

1. Acesse [https://cloudinary.com](https://cloudinary.com)
2. Click on **Sign Up Free** and create an account (the free plan is enough).
3. On the Cloudinary dashboard, go to **Dashboard → API Keys** and copy:
- **Cloud name**
- **API Key**
- **API Secret**

---

### ⚙️ Step 2: Configure environment variables

In the **local** environment, add these variables to the `.env.local` file (which is already in `.gitignore`):

```env
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY API KEY=sua api key
CLOUDINARY API SECRET=sua api_secret
```

---

### ▶️ 7. Start the development server

```bash
npm run dev
```

Open the browser at: [http://localhost:3000](http://localhost:3000)

---

## 🤖 Are you developing? Use our Code Reviewer!

To help you learn and ensure your code is following best practices before submitting a Pull Request, we have a **Code Review Agent** integrated with Gemini AI.

It runs directly on your terminal and generates automatic improvement reports!

👉 [Click here on our Contribution Guide](./CONTRIBUTING.md#️-como-usar-o-agente-de-code-review-inteligente) to see how to create your free Gemini key and run the `npm run review` command.

---

## 👤 Create Admin User for Testing

To facilitate API testing, we have included a script that creates an administrator user in the database.

📥 **How to run**
After configuring `.env` correctly and running Prisma migrations, run:

```bash
npm run seed
```

This command runs the script that creates an admin user with the following data:

- **Email:** admin@admin.com
- **Password:** test123
- **Role:** ADMIN

⚠️ Make sure the database is running before running the script (can be local, Docker or Neon).

This user can be used for authentication via API or interface, according to the permissions defined in the project.

---

## 🧹 Lint and formatting

To check for errors and maintain the code standard:

```bash
npm run lint
```

To automatically format with Prettier:

```bash
npm run format
```

---

## 🗄️ Database

The project uses Prisma to model the PostgreSQL database.

- The IDs are of the `CUID` type, ideal for distributed systems;
- All relationships (user, project, skills, stacks, feedback) are properly mapped;
- The migrations are versioned and can be applied with `prisma migrate dev` or `prisma migrate deploy`.

---

## 🧠 Other information

- The backend uses validations with **Zod**;
- Permissions are controlled by role (`role`) and centralized in `lib/check-auth.ts`;
- The frontend is structured with authentication via **NextAuth** and integration with the API.

---

## Contributors ✨

Check out our [CONTRIBUTORS.md](./CONTRIBUTORS.md) archive to meet all the amazing contributors who helped build this project. Feel free to open an issue or PR! 💜

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
