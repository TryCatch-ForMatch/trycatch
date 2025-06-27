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
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  let session;
  try {
    session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }
  } catch (error) {
    console.error('Erro ao obter sessão no PUT:', error);
    return NextResponse.json(
      { error: 'Erro de autenticação' },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.error('Erro ao fazer parse do JSON no PUT:', error);
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

  try {
    const updated = await prisma.projectStack.update({
      where: { id: params.id },
      data: {
        percentage: parsed.data.percentage,
      },
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
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
