import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getIdFromRequest } from '@/utils/url';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';

const idSchema = z.string().min(1, 'ID inválido.');
const updateTechStackSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  forceUpdate: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }

  try {
    const stack = await prisma.stack.findUnique({
      where: { id },
    });

    if (!stack) {
      return buildResponse({
        success: false,
        message: MESSAGES.TECH_STACK.NOT_FOUND,
        status: 404,
      });
    }

    return NextResponse.json(stack, { status: 200 });
  } catch (error) {
    console.log(error);
    return buildResponse({
      success: false,
      message: MESSAGES.TECH_STACK.INTERNAL_ERROR,
      status: 500,
      errors: [
        error instanceof Error ? error.message : 'Erro ao buscar stack.',
      ],
    });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }

  const body = await request.json();
  const parse = updateTechStackSchema.safeParse(body);

  if (!parse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: parse.error.errors.map((e) => e.message),
    });
  }

  const { name, forceUpdate } = parse.data;

  try {
    const existing = await prisma.stack.findFirst({
      where: {
        name,
        NOT: { id }, // ignora a própria stack que está sendo atualizada
      },
    });

    if (existing) {
      return buildResponse({
        success: false,
        message: MESSAGES.TECH_STACK.ALREADY_EXISTS,
        status: 409,
      });
    }

    const linkedStack = await prisma.projectStack.findFirst({
      where: { stackId: id },
    });
    if (linkedStack && !forceUpdate) {
      return buildResponse({
        success: false,
        message: MESSAGES.TECH_STACK.LINKED_TO_PROJECT,
        status: 409,
        errors: [
          'Esta stack está sendo usada em projetos. Alterações podem impactar dados existentes.',
        ],
      });
    }

    const stack = await prisma.stack.update({
      where: { id },
      data: { name },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.TECH_STACK.UPDATED,
      data: stack,
    });
  } catch (error) {
    console.log(error);
    console.error('Erro ao atualizar stack:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.TECH_STACK.INTERNAL_ERROR,
      status: 500,
      errors: [
        error instanceof Error ? error.message : 'Erro ao atualizar stack.',
      ],
    });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }

  try {
    const projectStack = await prisma.projectStack.findFirst({
      where: { stackId: id },
    });

    if (projectStack) {
      return buildResponse({
        success: false,
        message: MESSAGES.TECH_STACK.LINKED_TO_PROJECT,
        status: 409,
        errors: [
          'Esta stack está sendo usada em projetos. Não pode ser excluída.',
        ],
      });
    }

    const deleted = await prisma.stack.delete({ where: { id } });

    return buildResponse({
      success: true,
      message: MESSAGES.TECH_STACK.DELETED,
      data: { deletedId: deleted.id },
    });
  } catch (error) {
    console.log(error);
    return buildResponse({
      success: false,
      message: MESSAGES.TECH_STACK.INTERNAL_ERROR,
      status: 500,
      errors: [
        error instanceof Error ? error.message : 'Erro ao deletar stack.',
      ],
    });
  }
}
