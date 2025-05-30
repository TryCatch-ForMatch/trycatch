import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

// GET: Busca usuário por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      bio: true,
      linkedin: true,
      github: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Usuário não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

// PUT: Atualiza dados do usuário
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await request.json();

  const { name, avatar, linkedin, github, bio, password } = data;

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return NextResponse.json(
      { error: 'Usuário não encontrado' },
      { status: 404 }
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name,
      avatar,
      linkedin,
      github,
      bio,
      ...(password && {
        password: await bcrypt.hash(password, 10),
      }),
    },
  });

  return NextResponse.json(updatedUser);
}

// DELETE: Soft delete (seta isActive = false)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return NextResponse.json(
      { error: 'Usuário não encontrado' },
      { status: 404 }
    );
  }

  await prisma.user.update({
    where: { id },
    data: {
      isActive: false,
    },
  });

  return NextResponse.json({ message: 'Usuário desativado com sucesso' });
}
