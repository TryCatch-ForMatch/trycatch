import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';

const idSchema = z.string().min(24, 'ID inválido').max(36, 'ID inválido');

const updateUserSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().email('Email inválido.'),
  avatar: z.union([z.string().url(), z.literal('')]).nullable(),
  linkedin: z.union([z.string().url(), z.literal('')]).optional(),
  github: z.union([z.string().url(), z.literal('')]).optional(),
  bio: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']),
  skills: z.array(z.string()).optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response } = await checkAuth({ requireAdmin: true });
  if (!authorized) return response;

  const params = await context.params;

  const idParse = idSchema.safeParse(params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const id = idParse.data;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        skills: { include: { skill: true } },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao buscar usuário.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response } = await checkAuth({ requireAdmin: true });
  if (!authorized) return response;

  const params = await context.params;

  const idParse = idSchema.safeParse(params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const id = idParse.data;

  let body;

  try {
    body = await request.json();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao ler os dados.' },
      { status: 400 }
    );
  }

  const parse = updateUserSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', issues: parse.error.format() },
      { status: 400 }
    );
  }

  const { name, email, avatar, linkedin, github, bio, role, skills } =
    parse.data;

  try {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado.' },
        { status: 404 }
      );
    }

    const existingEmailUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmailUser && existingEmailUser.id !== id) {
      return NextResponse.json(
        { error: 'Já existe um usuário com este e-mail.' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        avatar,
        linkedin,
        github,
        bio,
        role,
        skills: skills
          ? {
              deleteMany: {},
              create: skills.map((skillId) => ({
                skill: { connect: { id: skillId } },
              })),
            }
          : undefined,
      },
      include: {
        skills: { include: { skill: true } },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log('Erro ao atualizar usuário: ', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response } = await checkAuth({ requireAdmin: true });
  if (!authorized) return response;

  const params = await context.params;

  const idParse = idSchema.safeParse(params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const id = idParse.data;

  try {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado.' },
        { status: 404 }
      );
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { message: 'Usuário deletado com sucesso.' },
      { status: 204 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao excluir usuário.' },
      { status: 500 }
    );
  }
}
