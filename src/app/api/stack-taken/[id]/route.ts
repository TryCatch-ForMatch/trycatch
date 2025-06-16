import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validação para edição de StackTaken
const updateStackTakenSchema = z.object({
  projectStackId: z.string().optional(),
  stackId: z.string().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
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
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

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

    if (existing.userId !== session.user.id) {
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
    console.error(error);
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
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
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

    if (existing.userId !== session.user.id) {
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
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao remover StackTaken' },
      { status: 500 }
    );
  }
}
