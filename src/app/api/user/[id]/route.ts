import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextRequest } from 'next/server';
import { getIdFromRequest } from '@/utils/url';

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      skills: {
        include: { skill: true },
      },
    },
  });

  if (!user) {
    return new Response('Usuário não encontrado', { status: 404 });
  }

  return Response.json(user);
}

export async function PUT(request: NextRequest) {
  const id = getIdFromRequest(request);
  const body = await request.json();

  const {
    name,
    email,
    password,
    avatar,
    linkedin,
    github,
    bio,
    skills, // Array de skillIds
  } = body;

  const hashedPassword = password ? await hash(password, 10) : undefined;

  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      password: hashedPassword,
      avatar,
      linkedin,
      github,
      bio,
      skills: skills
        ? {
            deleteMany: {}, // Remove todas as skills atuais
            create: skills.map((skillId: string) => ({
              skill: { connect: { id: skillId } },
            })),
          }
        : undefined,
    },
    include: {
      skills: {
        include: { skill: true },
      },
    },
  });

  return Response.json(user);
}

export async function DELETE(request: NextRequest) {
  const id = getIdFromRequest(request);
  await prisma.user.delete({
    where: { id },
  });

  return new Response(null, { status: 204 });
}
