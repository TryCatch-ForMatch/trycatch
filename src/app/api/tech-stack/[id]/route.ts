import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getIdFromRequest } from '@/utils/url';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';

const idSchema = z.string().min(1, 'ID inválido.');
const updateTechStackSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  forceUpdate: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
  }

  try {
    const stack = await prisma.stack.findUnique({
      where: { id },
    });

    if (!stack) {
      return NextResponse.json(
        { error: 'Stack não encontrada.' },
        { status: 404 }
      );
    }

    return NextResponse.json(stack);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao buscar stack.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
  }

  const body = await request.json();
  const parse = updateTechStackSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error.format() }, { status: 400 });
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
      return NextResponse.json(
        { error: 'Já existe uma stack com esse nome.' },
        { status: 409 }
      );
    }

    const linkedStack = await prisma.projectStack.findFirst({
      where: { stackId: id },
    });
    if (linkedStack && !forceUpdate) {
      return NextResponse.json(
        {
          error:
            'Esta stack está sendo usada em projetos. Alterações podem impactar dados existentes.',
        },
        { status: 409 }
      );
    }

    const stack = await prisma.stack.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(stack);
  } catch (error) {
    console.log(error);
    console.error('Erro ao atualizar stack:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar stack.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
  }

  try {
    const projectStack = await prisma.projectStack.findFirst({
      where: { stackId: id },
    });

    if (projectStack) {
      return NextResponse.json(
        {
          error:
            'Esta stack está vinculada a projetos e não pode ser excluída.',
        },
        { status: 409 }
      );
    }

    const deleted = await prisma.stack.delete({ where: { id } });

    return NextResponse.json({
      message: `Stack "${deleted.name}" deletada com sucesso.`,
      deletedId: deleted.id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao deletar stack.' },
      { status: 500 }
    );
  }
}
