# TryCatch 4Match - Collaborative Project Management Platform

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/github/all-contributors/TryCatch-ForMatch/trycatch?color=ee8449&style=flat-square)](./CONTRIBUTORS.md)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## 🚀 About the Project

**TryCatch** is a collaborative platform designed to organize projects, connect people, generate real portfolios, and create an environment that simulates the professional workplace. Here we practice **commitment, discipline, and collaboration.**

More than just code, this project is a collective learning laboratory where we evolve together in both technical and behavioral skills.

---

## 🔥 Objectives

Build a web platform where:
- Members can create and manage internal projects
- Tasks are divided based on technical skills
- The system matches tasks with members who have compatible profiles
- A collaboration history is generated for real portfolios

---

## 🏗️ Tech Stack

- **Frontend:** Next.js + TypeScript + TailwindCSS
- **Backend:** Next.js API Routes + TypeScript + Prisma
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Development Environment:** Docker + Docker Compose or Neon (cloud PostgreSQL)
- **Design:** Figma
- **Version Control:** Git + GitHub
- **Project Management:** GitHub Projects

---

## ❤️ Collective Building

Our focus is the real development of skills: teamwork, accountability, and delivery. All participants are encouraged to collaborate actively and with commitment, simulating a professional development team.

---

## 🙌 How to Contribute

Read the [Contributing Guide](./CONTRIBUTING.md) to understand the workflow, best practices, standards, and team agreements.

Also check our [CONTRIBUTORS.md](./CONTRIBUTORS.md) file to meet all the amazing contributors who helped build this project. 🚀

---

## ⚙️ Running Locally

### 🧾 1. Prerequisites

- Node.js (recommended version: LTS)
- Docker + Docker Compose (if running the database via container)

---

### 📦 2. Clone the Repository

```bash
git clone https://github.com/TryCatch-ForMatch/trycatch.git
cd trycatch
git checkout develop
```

---

### 📥 3. Install Dependencies

```bash
npm install
```

---

### 🔐 4. Configure the `.env` File

Create a `.env` file in the project root based on the example below:

```env
# 👉 Option 1: Shared database (Neon - recommended for teams)
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD_HERE@ep-autumn-surf-acr8iv80-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# 👉 Option 2: Database running via local Docker
# DATABASE_URL="postgresql://trycatch_user:trycatch_pass@localhost:5555/trycatch_db"

# 👉 Option 3: Database running locally without Docker
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/trycatch_db"

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a-secure-secret
JWT_SECRET=another-secret
```

---

### 🐳 5. Choose How to Run the Database

You have **3 options** for using PostgreSQL in the development environment:

✅ **Option 1 – Use the shared Neon database (recommended)**  
No need to install or run Docker. Just configure the `.env` with the Neon URL and run migrations normally:

```bash
npx prisma migrate deploy
npm run seed   # optional, to create admin test user
```

✅ **Option 2 – Use Docker locally**  
If you prefer to run your own local PostgreSQL container:

```bash
docker-compose up -d
```

This creates a PostgreSQL database accessible at `localhost:5555`.  
Then apply the migrations:

```bash
npx prisma migrate dev
npm run seed
```

✅ **Option 3 – Use PostgreSQL installed locally on your machine**  
If you already have PostgreSQL installed, adjust the `DATABASE_URL` to use the default port `5432` and run migrations normally.

---

### 🔃 6. Run Prisma Migrations

Regardless of the chosen option, apply Prisma migrations to create the tables:

```bash
npx prisma generate
npx prisma migrate deploy   # if using Neon
# or
npx prisma migrate dev      # if using Docker/local
```

💡 **Tip:** Use `npx prisma studio` to visualize the database in a web interface.

---

## 📸 Avatar Upload with Cloudinary

This project uses **[Cloudinary](https://cloudinary.com)** to store and optimize user avatars.  
Uploads are automatically sent to Cloudinary, and the image URL is saved in the database.

---

### 📝 Step 1: Create a Free Cloudinary Account

1. Visit [https://cloudinary.com](https://cloudinary.com)
2. Click **Sign Up Free** and create an account (free plan is sufficient)
3. In the Cloudinary dashboard, go to **Dashboard → API Keys** and copy:
   - **Cloud name**
   - **API Key**
   - **API Secret**

---

### ⚙️ Step 2: Configure Environment Variables

In your **local** environment, add these variables to the `.env` file (which is already in `.gitignore`):

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### ▶️ 7. Start the Development Server

```bash
npm run dev
```

Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## 👤 Creating an Admin User for Testing

To facilitate API testing, we've included a script that creates an administrator user in the database.

📥 **How to run**  
After configuring the `.env` correctly and running Prisma migrations, execute:

```bash
npm run seed
```

This command runs the script that creates an admin user with the following credentials:

- **Email:** admin@admin.com  
- **Password:** teste123  
- **Role:** ADMIN

⚠️ Make sure the database is running before executing the script (can be local, Docker, or Neon).

This user can be used for authentication via API or interface, according to the permissions defined in the project.

---

## 🧹 Linting and Formatting

To check for errors and maintain code standards:

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

- IDs are of type `CUID`, ideal for distributed systems
- All relationships (user, project, skills, stacks, feedback) are properly mapped
- Migrations are versioned and can be applied with `prisma migrate dev` or `prisma migrate deploy`

---

## 🧠 Additional Information

- The backend uses validation with **Zod**
- Permissions are controlled by role and centralized in `lib/check-auth.ts`
- The frontend is structured with authentication via **NextAuth** and API integration

---

## 🤝 Contributors

Feel free to open an issue or PR. 💜

Check our [CONTRIBUTORS.md](./CONTRIBUTORS.md) file to meet all the amazing contributors who helped build this project.

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
