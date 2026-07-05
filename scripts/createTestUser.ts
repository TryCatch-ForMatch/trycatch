import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma';

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
  .then(async () => {
    console.log('✅ Script finalizado.');
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('❌ Ocorreu um erro:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
