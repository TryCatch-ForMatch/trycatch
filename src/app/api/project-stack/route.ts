import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { checkProjectStatus } from '@/lib/check-project-status';
import { logger } from '@/lib/logger';

// Validação de criação
const createProjectStackSchema = z.object({
  projectId: z.string(),
  stackId: z.string(),
  percentage: z.number().min(0).max(100),
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
      'POST /api/project-stack',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: { message: 'Body inválido. Envie um JSON válido.' },
    });
  }

  const parsed = createProjectStackSchema.safeParse(body);
  if (!parsed.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { projectId, stackId, percentage } = parsed.data;

  try {
    const [project, stack] = await Promise.all([
      prisma.project.findUnique({ where: { id: projectId } }),
      prisma.stack.findUnique({ where: { id: stackId } }),
    ]);

    if (!project || !stack) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT_STACK.NOT_FOUND,
        status: 404,
        errors: { message: 'Projeto ou Stack não encontrados.' },
      });
    }

    const existingStacks = await prisma.projectStack.findMany({
      where: { projectId },
    });

    const total =
      existingStacks.reduce((acc, item) => acc + item.percentage, 0) +
      percentage;

    if (total > 100) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT_STACK.PERCENTAGE_ERROR,
        status: 400,
        errors: {
          percentage:
            'A soma dos percentuais das stacks não pode ultrapassar 100%',
        },
      });
    }

    const newProjectStack = await prisma.projectStack.create({
      data: {
        projectId,
        stackId,
        percentage,
      },
    });

    await checkProjectStatus(projectId);

    return buildResponse({
      success: true,
      message: MESSAGES.PROJECT_STACK.CREATED,
      status: 201,
      data: newProjectStack,
    });
  } catch (error) {
    logger.error('Erro ao criar ProjectStack:', 'POST /api/project-stack', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT_STACK.INTERNAL_ERROR,
      status: 500,
      errors: { message: 'Erro interno ao criar ProjectStack.' },
    });
  }
}

export async function GET(request: NextRequest) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  let projectId: string | null = null;
  try {
    const { searchParams } = new URL(request.url);
    projectId = searchParams.get('projectId');
  } catch (error) {
    logger.error('Erro ao processar URL no GET:', 'GET /api/project-stack', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: { message: 'projectId inválido.' },
    });
  }

  if (!projectId) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: { message: 'projectId é obrigatório.' },
    });
  }

  try {
    const stacks = await prisma.projectStack.findMany({
      where: { projectId },
      include: {
        stack: true,
      },
    });

    return NextResponse.json(stacks, { status: 200 });
  } catch (error) {
    logger.error('Erro ao buscar ProjectStacks:', 'GET /api/project-stack', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT_STACK.INTERNAL_ERROR,
      status: 500,
      errors: { message: 'Erro interno ao buscar ProjectStacks.' },
    });
  }
}
