import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validação para atualização de percentage
const updatePercentageSchema = z.object({
  percentage: z.number().min(0).max(100),
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
    const projectStack = await prisma.projectStack.findUnique({
      where: { id: params.id },
      include: {
        stack: true,
        project: true,
      },
    });

    if (!projectStack) {
      return NextResponse.json(
        { error: 'ProjectStack não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(projectStack);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao buscar ProjectStack' },
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
  const parsed = updatePercentageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.projectStack.update({
      where: { id: params.id },
      data: {
        percentage: parsed.data.percentage,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao atualizar ProjectStack' },
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
    await prisma.projectStack.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'ProjectStack removido com sucesso' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao remover ProjectStack' },
      { status: 500 }
    );
  }
}
