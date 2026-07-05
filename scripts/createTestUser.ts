import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma';

export async function createTestUser() {
  const password = 'teste123';
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.upsert({
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
}

function isDirectRun() {
  return process.argv[1]
    ?.replaceAll('\\', '/')
    .endsWith('/scripts/createTestUser.ts');
}

/* c8 ignore start */
if (isDirectRun()) {
  createTestUser()
    .then(async (user) => {
      console.log('Usuário criado ou já existente:', user);
      console.log('✅ Script finalizado.');
      await prisma.$disconnect();
      process.exit(0);
    })
    .catch(async (error) => {
      console.error('❌ Ocorreu um erro:', error);
      await prisma.$disconnect();
      process.exit(1);
    });
}
/* c8 ignore stop */
