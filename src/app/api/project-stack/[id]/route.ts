import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';

// Validação para atualização de percentage
const updatePercentageSchema = z.object({
  percentage: z.number().min(0).max(100),
});

export async function GET(
  req: Request,
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
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  try {
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
