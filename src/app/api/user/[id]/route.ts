import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextRequest } from 'next/server';
import { getIdFromRequest } from '@/utils/url';
import jwt from 'jsonwebtoken';

function getUserFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);

  const userAuth = getUserFromRequest(request);

  if (!userAuth || userAuth.id !== id) {
    return new Response('Acesso negado', { status: 403 });
  }

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

  const userAuth = getUserFromRequest(request);
  if (!userAuth || userAuth.id !== id) {
    return new Response('Acesso negado', { status: 403 });
  }

  const body = await request.json();

  const { name, email, password, avatar, linkedin, github, bio, skills } = body;

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
            deleteMany: {},
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

  const userAuth = getUserFromRequest(request);
  if (!userAuth || userAuth.id !== id) {
    return new Response('Acesso negado', { status: 403 });
  }

  await prisma.user.delete({
    where: { id },
  });

  return new Response(null, { status: 204 });
}
