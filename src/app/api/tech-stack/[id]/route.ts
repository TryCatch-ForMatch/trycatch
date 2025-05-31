import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Obter uma stack por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const stack = await prisma.stack.findUnique({
      where: { id: params.id },
    });

    if (!stack) {
      return NextResponse.json(
        { error: 'Stack não encontrada.' },
        { status: 404 }
      );
    }

    return NextResponse.json(stack);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar stack.' },
      { status: 500 }
    );
  }
}

// PATCH - Atualizar uma stack
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'O nome é obrigatório.' },
        { status: 400 }
      );
    }

    const stack = await prisma.stack.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(stack);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar stack.' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar uma stack
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.stack.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Stack deletada com sucesso.' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar stack.' },
      { status: 500 }
    );
  }
}
