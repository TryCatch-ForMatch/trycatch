import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateStackTakenSchema = z.object({
  projectStackId: z.string().uuid().optional(),
  stackId: z.string().uuid().optional(),
});

const idSchema = z.string().uuid('ID inválido.');

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
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
      return NextResponse.json(
        { error: 'StackTaken não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(stackTaken);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao buscar StackTaken' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const body = await req.json();
  const parsed = updateStackTakenSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.stackTaken.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'StackTaken não encontrado' },
        { status: 404 }
      );
    }

    if (existing.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Ação não permitida' },
        { status: 403 }
      );
    }

    const updated = await prisma.stackTaken.update({
      where: { id: params.id },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Erro ao atualizar StackTaken:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar StackTaken' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
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
      return NextResponse.json(
        { error: 'StackTaken não encontrado' },
        { status: 404 }
      );
    }

    if (existing.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Ação não permitida' },
        { status: 403 }
      );
    }

    await prisma.stackTaken.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'StackTaken removido com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir StackTaken:', error);
    return NextResponse.json(
      { error: 'Erro ao remover StackTaken' },
      { status: 500 }
    );
  }
}
