import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { logger } from '@/lib/logger';

// Validação para atualização de percentage
const updatePercentageSchema = z.object({
  percentage: z.number().min(0).max(100),
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  try {
    const projectStack = await prisma.projectStack.findUnique({
      where: { id: params.id },
      include: {
        stack: true,
        project: true,
      },
    });

    if (!projectStack) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT_STACK.NOT_FOUND,
        status: 404,
      });
    }

    return NextResponse.json(projectStack, { status: 200 });
  } catch (error) {
    logger.error(
      'Erro ao buscar ProjectStack:',
      'GET /api/project-stack/[id]',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT_STACK.INTERNAL_ERROR,
      errors: { message: 'Erro ao buscar ProjectStack' },
      status: 500,
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
    const target = await prisma.projectStack.findUnique({
      where: { id: params.id },
    });

    if (!target) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT_STACK.NOT_FOUND,
        status: 404,
      });
    }

    // Busca stacks restantes do projeto, exeto a atual, garantir regra de 100%
    const remainingStacks = await prisma.projectStack.findMany({
      where: {
        projectId: target.projectId,
        NOT: { id: target.id },
      },
    });

    const totalRemaining = remainingStacks.reduce(
      (acc, s) => acc + s.percentage,
      0
    );

    if (totalRemaining !== 100 - target.percentage) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT_STACK.DELETE_ERROR,
        errors: {
          message:
            'A remoção desta stack resultaria em um total de percentuais diferente de 100%',
        },
        status: 400,
      });
    }

    await prisma.projectStack.delete({
      where: { id: params.id },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.PROJECT_STACK.DELETED,
      status: 200,
    });
  } catch (error) {
    logger.error(
      'Erro ao remover ProjectStack:',
      'DELETE /api/project-stack/[id]',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT_STACK.INTERNAL_ERROR,
      errors: { message: 'Erro ao remover ProjectStack' },
      status: 500,
    });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  let body;
  try {
    body = await request.json();
  } catch (error) {
    logger.error(
      'Erro ao fazer parse do JSON no PATCH:',
      'PATCH /api/project-stack/[id]',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: { message: 'Body inválido. Envie um JSON válido.' },
      status: 400,
    });
  }

  const parsed = updatePercentageSchema.safeParse(body);
  if (!parsed.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: { issues: parsed.error.issues },
      status: 400,
    });
  }

  const { percentage } = parsed.data;

  try {
    const target = await prisma.projectStack.findUnique({
      where: { id: params.id },
    });

    if (!target) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT_STACK.NOT_FOUND,
        status: 404,
      });
    }

    // Busca stacks restantes do projeto, exeto a atual, garantir regra de 100%
    const otherStacks = await prisma.projectStack.findMany({
      where: {
        projectId: target.projectId,
        NOT: { id: target.id },
      },
    });

    const totalOthers = otherStacks.reduce((acc, s) => acc + s.percentage, 0);
    const newTotal = totalOthers + percentage;

    if (newTotal !== 100) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT_STACK.PERCENTAGE_ERROR,
        errors: {
          message:
            'A nova soma dos percentuais do projeto deve ser exatamente 100%',
        },
        status: 400,
      });
    }

    const updated = await prisma.projectStack.update({
      where: { id: params.id },
      data: { percentage },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    logger.error(
      'Erro ao atualizar ProjectStack:',
      'PATCH /api/project-stack/[id]',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT_STACK.INTERNAL_ERROR,
      errors: { message: 'Erro ao atualizar ProjectStack' },
      status: 500,
    });
  }
}
