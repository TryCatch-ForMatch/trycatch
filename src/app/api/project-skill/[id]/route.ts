import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { logger } from '@/lib/logger';

const idSchema = z.string().min(25, 'ID inválido').max(36, 'ID inválido');

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      errors: idParse.error.issues,
      message: MESSAGES.PROJECT_SKILL.NOT_FOUND,
      status: 400,
    });
  }
  const projectId = idParse.data;

  try {
    const projectSkill = await prisma.projectSkill.findUnique({
      where: { id: projectId },
      include: { skill: true },
    });

    if (!projectSkill) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT_SKILL.NOT_FOUND,
        status: 404,
      });
    }

    return NextResponse.json(projectSkill, { status: 200 });
  } catch (error) {
    logger.error('Erro no GET /project-skill:', 'GET /api/project-skill/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT_SKILL.INTERNAL_ERROR,
      status: 500,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  try {
    await prisma.projectSkill.delete({
      where: { id: params.id },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.PROJECT_SKILL.DELETED,
    });
  } catch (error) {
    logger.error(
      'Erro ao remover skill do projeto:',
      'DELETE /api/project-skill/[id]',
      { error: error instanceof Error ? error.message : String(error) }
    );
    if (error instanceof z.ZodError) {
      return buildResponse({
        success: false,
        errors: error.issues,
        message: MESSAGES.PROJECT_SKILL.DELETE_ERROR,
        status: 400,
      });
    }
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT_SKILL.INTERNAL_ERROR,
      status: 500,
    });
  }
}
