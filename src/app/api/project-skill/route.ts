import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { logger } from '@/lib/logger';

const createProjectSkillSchema = z.object({
  projectId: z.string(),
  skillId: z.string(),
});

export async function POST(request: NextRequest) {
  const auth = await checkAuth();

  if (!auth.authorized) return auth.response;

  let body;
  try {
    body = await request.json();
  } catch (error) {
    logger.error(
      'Erro ao fazer parse do JSON no POST:',
      'POST /api/project-skill',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: { body: 'Body inválido. Envie um JSON válido.' },
    });
  }

  const parsed = createProjectSkillSchema.safeParse(body);
  if (!parsed.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { projectId, skillId } = parsed.data;

  try {
    const exists = await prisma.projectSkill.findFirst({
      where: { projectId, skillId },
    });

    if (exists) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT_SKILL.CREATE_ERROR,
        status: 400,
        errors: { projectSkill: 'Skill já associada ao projeto.' },
      });
    }

    const newProjectSkill = await prisma.projectSkill.create({
      data: { projectId, skillId },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.PROJECT_SKILL.CREATED,
      data: newProjectSkill,
      status: 201,
    });
  } catch (error) {
    logger.error(
      'Erro ao adicionar skill ao projeto:',
      'POST /api/project-skill',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT_SKILL.CREATE_ERROR,
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  const auth = await checkAuth();

  if (!auth.authorized) return auth.response;

  let projectId;
  try {
    const { searchParams } = new URL(request.url);
    projectId = searchParams.get('projectId');
  } catch (error) {
    logger.error('Erro ao processar URL no GET:', 'GET /api/project-skill', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT_SKILL.NOT_FOUND,
      errors: { url: 'URL inválida.' },
      status: 400,
    });
  }

  if (!projectId) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: { projectId: 'projectId é obrigatório na query' },
      status: 400,
    });
  }

  try {
    const skills = await prisma.projectSkill.findMany({
      where: { projectId },
      include: { skill: true },
    });

    return NextResponse.json(skills, { status: 200 });
  } catch (error) {
    logger.error(
      'Erro ao buscar skills do projeto:',
      'GET /api/project-skill',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT_SKILL.INTERNAL_ERROR,
      status: 500,
      errors: { database: 'Erro ao buscar skills do projeto.' },
    });
  }
}
