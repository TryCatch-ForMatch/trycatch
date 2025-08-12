import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';
import { MESSAGES, buildResponse } from '@/constants/messages';

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
      errors: idParse.error.errors,
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

    return buildResponse({
      success: true,
      message: MESSAGES.PROJECT_SKILL.FETCH_SUCCESS,
      data: projectSkill,
      status: 200,
    });
  } catch (error) {
    console.error('Erro no GET /project-skill:', error);
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
    console.error('Erro ao remover skill do projeto:', error);
    if (error instanceof z.ZodError) {
      return buildResponse({
        success: false,
        errors: error.errors,
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
