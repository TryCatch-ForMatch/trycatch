import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { ROLE_GROUPS } from '@/lib/roles';

const idSchema = z.string().min(25, 'ID inválido').max(36, 'ID inválido');
const updateUserSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().email('Email inválido.'),
  password: z
    .union([
      z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
      z.literal(''),
    ])
    .optional(),
  avatar: z.union([z.string().url(), z.literal('')]).nullable(),
  linkedin: z.union([z.string().url().optional(), z.literal('')]),
  github: z.union([z.string().url().optional(), z.literal('')]),
  bio: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
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
      return buildResponse({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
        status: 404,
      });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao buscar usuário.'],
    });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }

  const id = idParse.data;

  if (session.user.id !== id) {
    return buildResponse({
      success: false,
      message: MESSAGES.AUTH.UNAUTHORIZED,
      status: 403,
      errors: ['Acesso negado. Você não é o dono desse perfil.'],
    });
  }

  let body;

  try {
    body = await request.json();
  } catch (error) {
    console.error(error);
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: ['Erro ao ler o corpo da requisição.'],
    });
  }

  const parse = updateUserSchema.safeParse(body);
  if (!parse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: ['Dados inválidos.', parse.error.format()],
    });
  }

  const { name, email, password, avatar, linkedin, github, bio } = parse.data;

  try {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
        status: 404,
      });
    }

    const hashedPassword = password ? await hash(password, 10) : undefined;

    const existingEmailUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmailUser && existingEmailUser.id !== id) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER.ALREADY_EXISTS,
        status: 400,
        errors: ['Já existe um usuário com este e-mail.'],
      });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
        avatar,
        linkedin,
        github,
        bio,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao atualizar usuário.'],
    });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }

  const id = idParse.data;

  if (session.user.id !== id && session.user.role !== 'ADMIN') {
    return buildResponse({
      success: false,
      message: MESSAGES.AUTH.UNAUTHORIZED,
      status: 403,
      errors: ['Acesso negado. Você só pode excluir seu próprio perfil.'],
    });
  }

  try {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
        status: 404,
      });
    }

    // Verifica se o usuário tem vínculos em StackTaken
    const hasStackTaken = await prisma.stackTaken.findFirst({
      where: { userId: id },
    });

    if (hasStackTaken) {
      // Soft delete: apenas desativa
      await prisma.user.update({
        where: { id },
        data: { isActive: false },
      });

      return NextResponse.json(
        {
          message:
            'Usuário desativado (soft delete) devido a vínculos em StackTaken.',
        },
        { status: 200 }
      );
    } else {
      // Hard delete: se não tem vinculo com a tabela StackTaken, exclui do banco
      await prisma.userSkill.deleteMany({
        where: { userId: id },
      });
      await prisma.user.delete({
        where: { id },
      });

      return buildResponse({
        success: true,
        message: MESSAGES.USER.DELETED,
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro interno ao deletar usuário.'],
    });
  }
}
