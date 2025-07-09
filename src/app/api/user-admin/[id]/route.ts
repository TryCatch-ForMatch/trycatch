import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { hash } from 'bcrypt';

const idSchema = z.string().min(25, 'ID inválido').max(36, 'ID inválido');

const updateUserSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().email('Email inválido.'),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres.')
    .optional(),
  avatar: z.union([z.string().url(), z.literal('')]).nullable(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
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

  const idParse = idSchema.safeParse(context.params.id);
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

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const id = idParse.data;
  let body;

  try {
    body = await request.json();
  } catch {
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

  const { name, email, password, avatar, linkedin, github, bio, role, skills } =
    parse.data;

  try {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado.' },
        { status: 404 }
      );
    }

    const hashedPassword = password ? await hash(password, 10) : undefined;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
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
    console.error(error);
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

  const idParse = idSchema.safeParse(context.params.id);
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
