import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const password = 'teste123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email: 'teste@teste.com' },
    update: {},
    create: {
      name: 'Usuário Teste',
      email: 'teste@teste.com',
      password: hashedPassword,
      avatar: '',
      bio: 'Usuário para testes da API',
      linkedin: '',
      github: '',
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
