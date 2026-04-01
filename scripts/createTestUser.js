/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = 'teste123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'Usuário Admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      avatar: '',
      bio: 'Usuário admin para testes da API',
      linkedin: 'https://www.linkedin.com/in/trycatch-app',
      github: 'https://github.com/TryCatch-ForMatch/trycatch',
      role: 'ADMIN',
    },
  });

  console.log('Usuário criado ou já existente:', user);
}

main()
  .then(() => {
    console.log('✅ Script finalizado.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Ocorreu um erro:', error);
    process.exit(1);
  });
