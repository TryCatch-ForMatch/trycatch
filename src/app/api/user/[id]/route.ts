import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';

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
  skills: z.array(z.string()).optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const id = idParse.data;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        skills: {
          include: { skill: true },
        },
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
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const id = idParse.data;

  if (session.user.id !== id) {
    return NextResponse.json(
      { error: 'Acesso negado. Você não é o dono desse perfil.' },
      { status: 403 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao ler o corpo da requisição.' },
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

  const { name, email, password, avatar, linkedin, github, bio, skills } =
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

    const existingEmailUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmailUser && existingEmailUser.id !== id) {
      return NextResponse.json(
        { error: 'Já existe um usuário com este e-mail.' },
        { status: 400 }
      );
    }

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

    return NextResponse.json(user);
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
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const id = idParse.data;

  if (session.user.id !== id && session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Acesso negado. Você só pode excluir seu próprio perfil.' },
      { status: 403 }
    );
  }

  try {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado.' },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Usuário deletado com sucesso.' },
      { status: 204 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro interno ao deletar usuário.' },
      { status: 500 }
    );
  }
}
