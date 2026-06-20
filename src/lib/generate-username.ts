import { prisma } from '@/lib/prisma';

function slugifyName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export async function generateUniqueUsername(name: string): Promise<string> {
  const baseUsername = slugifyName(name);

  const existingUser = await prisma.user.findUnique({
    where: {
      userName: baseUsername,
    },
  });

  if (!existingUser) {
    return baseUsername;
  }

  let username: string;
  let isUnique = false;

  do {
    const randomNumber = Math.floor(100 + Math.random() * 900);

    username = `${baseUsername}-${randomNumber}`;

    const user = await prisma.user.findUnique({
      where: {
        userName: username,
      },
    });

    isUnique = !user;
  } while (!isUnique);

  return username;
}
