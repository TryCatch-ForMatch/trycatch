import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { buildResponse, MESSAGES } from '@/constants/messages';
import { ROLES, Role } from '@/lib/roles';
import { logger } from '@/lib/logger';

const idSchema = z.string().min(24, 'ID inválido').max(36, 'ID inválido');

const updateUserSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.email('Email inválido.'),
  avatar: z.union([z.url(), z.literal('')]).nullable(),
  linkedin: z.union([z.url(), z.literal('')]).optional(),
  github: z.union([z.url(), z.literal('')]).optional(),
  bio: z.string().optional(),
  role: z.enum(Object.values(ROLES) as [Role, ...Role[]]),
  skills: z.array(z.string()).optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { authorized, response } = await checkAuth({ requireAdmin: true });
  if (!authorized) return response;

  const idParse = idSchema.safeParse(params.id);
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
        skills: { include: { skill: true } },
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
    logger.error('Unexpected error', 'GET /api/user-admin/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });

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
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { authorized, response } = await checkAuth({ requireAdmin: true });
  if (!authorized) return response;

  const idParse = idSchema.safeParse(params.id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }

  const id = idParse.data;

  let body;

  try {
    body = await request.json();
  } catch (error) {
    logger.error('Unexpected error', 'PUT /api/user-admin/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: ['Erro ao ler os dados do usuário.'],
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

  const { name, email, avatar, linkedin, github, bio, role, skills } =
    parse.data;

  try {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
        status: 404,
      });
    }

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

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    logger.error('Erro ao atualizar usuário:', 'PUT /api/user-admin/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
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
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { authorized, response } = await checkAuth({ requireAdmin: true });
  if (!authorized) return response;

  const idParse = idSchema.safeParse(params.id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }

  const id = idParse.data;

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
    logger.error('Unexpected error', 'DELETE /api/user-admin/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao excluir usuário.'],
    });
  }
}
