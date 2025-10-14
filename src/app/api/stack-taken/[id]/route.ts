import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { checkProjectStatus } from '@/lib/check-project-status';

const updateStackTakenSchema = z.object({
  projectStackId: z.string().min(1, 'ID inválido.'),
  stackId: z.string().min(1, 'ID inválido.'),
});

const idSchema = z.string().min(1, 'ID inválido.');

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(params.id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: { id: ['ID inválido'] },
    });
  }

  try {
    const stackTaken = await prisma.stackTaken.findUnique({
      where: { id: params.id },
      include: {
        stack: true,
        project: true,
        projectStack: true,
        user: true,
      },
    });

    if (!stackTaken) {
      return buildResponse({
        success: false,
        message: MESSAGES.STACK_TAKEN.NOT_FOUND,
        status: 404,
        errors: { id: ['StackTaken não encontrado'] },
      });
    }

    return NextResponse.json(stackTaken, { status: 200 });
  } catch (error) {
    console.error(error);
    return buildResponse({
      success: false,
      message: MESSAGES.STACK_TAKEN.INTERNAL_ERROR,
      status: 500,
      errors: { error: ['Erro ao buscar StackTaken'] },
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const body = await request.json();
  const parsed = updateStackTakenSchema.safeParse(body);

  if (!parsed.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const existing = await prisma.stackTaken.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return buildResponse({
        success: false,
        message: MESSAGES.STACK_TAKEN.NOT_FOUND,
        status: 404,
      });
    }

    if (existing.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.UNAUTHORIZED,
        status: 403,
        errors: { authorization: ['Ação não permitida'] },
      });
    }

    const updated = await prisma.stackTaken.update({
      where: { id: params.id },
      data: parsed.data,
    });

    await checkProjectStatus(existing.projectId);

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar StackTaken:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.STACK_TAKEN.INTERNAL_ERROR,
      status: 500,
      errors: { error: ['Erro ao atualizar StackTaken'] },
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  try {
    const existing = await prisma.stackTaken.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return buildResponse({
        success: false,
        message: MESSAGES.STACK_TAKEN.NOT_FOUND,
        status: 404,
      });
    }

    if (existing.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.UNAUTHORIZED,
        status: 403,
        errors: { authorization: ['Ação não permitida'] },
      });
    }

    await prisma.stackTaken.delete({
      where: { id: params.id },
    });

    await checkProjectStatus(existing.projectId);

    return buildResponse({
      success: true,
      message: MESSAGES.STACK_TAKEN.DELETED,
      status: 200,
    });
  } catch (error) {
    console.error('Erro ao excluir StackTaken:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.STACK_TAKEN.INTERNAL_ERROR,
      status: 500,
      errors: { error: ['Erro ao excluir StackTaken'] },
    });
  }
}
