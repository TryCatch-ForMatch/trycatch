import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { buildResponse, MESSAGES } from '@/constants/messages';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const skillId = searchParams.get('skillId');

  if (!userId && !skillId) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: ['Informe userId ou skillId'],
    });
  }

  try {
    if (userId) {
      const skills = await prisma.userSkill.findMany({
        where: { userId },
        include: { skill: true },
      });
      return NextResponse.json(skills, { status: 200 });
    }

    if (skillId) {
      const users = await prisma.userSkill.findMany({
        where: { skillId },
        include: { user: true },
      });
      return NextResponse.json(users, { status: 200 });
    }
  } catch (error) {
    logger.error('Unexpected error', 'GET /api/user-skill/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.USER_SKILL.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao buscar skills de usuário'],
    });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  try {
    const userSkill = await prisma.userSkill.findUnique({
      where: { id: params.id },
    });

    if (!userSkill) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER_SKILL.NOT_FOUND,
        status: 404,
      });
    }

    if (userSkill.userId !== params.id) {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.UNAUTHORIZED,
        status: 403,
        errors: [
          'Você não tem permisssão para excluir skills de outros usuários.',
        ],
      });
    }

    await prisma.userSkill.delete({ where: { id: params.id } });

    return buildResponse({
      success: true,
      message: MESSAGES.USER_SKILL.DELETED,
      status: 200,
    });
  } catch (error) {
    logger.error('Unexpected error', 'DELETE /api/user-skill/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.USER_SKILL.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao remover skill'],
    });
  }
}
