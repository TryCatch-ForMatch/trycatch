import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';

const createStackTakenSchema = z.object({
  projectId: z.string().min(25, 'ID inválido').max(36, 'ID inválido'),
  projectStackId: z.string().min(25, 'ID inválido').max(36, 'ID inválido'),
  stackId: z.string().min(25, 'ID inválido').max(36, 'ID inválido'),
});

export async function POST(request: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const body = await request.json();
  const parsed = createStackTakenSchema.safeParse(body);

  if (!parsed.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: parsed.error.issues,
      status: 400,
    });
  }

  const { projectId, projectStackId, stackId } = parsed.data;

  try {
    console.log('➡ Dados recebidos:', {
      projectId,
      projectStackId,
      stackId,
      userId: session.user.id,
    });

    const projectExists = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!projectExists) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT.NOT_FOUND,
        status: 400,
        errors: ['Projeto não encontrado'],
      });
    }

    const projectStackExists = await prisma.projectStack.findUnique({
      where: { id: projectStackId },
    });
    if (!projectStackExists) {
      return buildResponse({
        success: false,
        message: MESSAGES.STACK_TAKEN.NOT_FOUND,
        status: 400,
        errors: ['ProjectStack não encontrada'],
      });
    }

    const stackExists = await prisma.stack.findUnique({
      where: { id: stackId },
    });
    if (!stackExists) {
      return buildResponse({
        success: false,
        message: MESSAGES.TECH_STACK.NOT_FOUND,
        status: 400,
        errors: ['Stack não encontrada'],
      });
    }

    const alreadyTaken = await prisma.stackTaken.findFirst({
      where: { projectStackId },
    });
    if (alreadyTaken) {
      return buildResponse({
        success: false,
        message: MESSAGES.STACK_TAKEN.ALREADY_TAKEN,
        status: 400,
      });
    }

    const newStackTaken = await prisma.stackTaken.create({
      data: {
        userId: session.user.id,
        projectId,
        projectStackId,
        stackId,
      },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.STACK_TAKEN.CREATED,
      data: newStackTaken,
      status: 201,
    });
  } catch (error) {
    console.error('Erro ao criar StackTaken:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.STACK_TAKEN.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao criar StackTaken'],
    });
  }
}

export async function GET(request: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');

  try {
    const stackTakens = await prisma.stackTaken.findMany({
      where: projectId ? { projectId } : { userId: session.user.id },
      include: {
        stack: true,
        project: true,
        projectStack: true,
      },
    });

    return NextResponse.json(stackTakens, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar StackTakens:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.STACK_TAKEN.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao buscar StackTakens'],
    });
  }
}
