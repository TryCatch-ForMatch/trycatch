import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';

// Validação para atualização de percentage
const updatePercentageSchema = z.object({
  percentage: z.number().min(0).max(100),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      return NextResponse.json(
        { error: 'ProjectStack não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(projectStack);
  } catch (error) {
    console.error('Erro ao buscar ProjectStack:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar ProjectStack' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  try {
    const target = await prisma.projectStack.findUnique({
      where: { id: params.id },
    });

    if (!target) {
      return NextResponse.json(
        { error: 'ProjectStack não encontrado' },
        { status: 404 }
      );
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
      return NextResponse.json(
        {
          error:
            'A remoção desta stack resultaria em um total de percentuais diferente de 100%',
        },
        { status: 400 }
      );
    }

    await prisma.projectStack.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'ProjectStack removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover ProjectStack:', error);
    return NextResponse.json(
      { error: 'Erro ao remover ProjectStack' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error('Erro ao fazer parse do JSON no PATCH:', error);
    return NextResponse.json(
      { error: 'Body inválido. Envie um JSON válido.' },
      { status: 400 }
    );
  }

  const parsed = updatePercentageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { percentage } = parsed.data;

  try {
    const target = await prisma.projectStack.findUnique({
      where: { id: params.id },
    });

    if (!target) {
      return NextResponse.json(
        { error: 'ProjectStack não encontrado' },
        { status: 404 }
      );
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
      return NextResponse.json(
        {
          error:
            'A nova soma dos percentuais do projeto deve ser exatamente 100%',
        },
        { status: 400 }
      );
    }

    const updated = await prisma.projectStack.update({
      where: { id: params.id },
      data: { percentage },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Erro ao atualizar ProjectStack:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar ProjectStack' },
      { status: 500 }
    );
  }
}
