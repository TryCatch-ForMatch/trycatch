import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getIdFromRequest } from '@/utils/url';

// GET - Obter uma stack por ID
export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);
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

// PATCH - Atualizar uma stack
export async function PATCH(request: NextRequest) {
  const id = getIdFromRequest(request);
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'O nome é obrigatório.' },
        { status: 400 }
      );
    }

    const stack = await prisma.stack.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(stack);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao atualizar stack.' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar uma stack
export async function DELETE(request: NextRequest) {
  const id = getIdFromRequest(request);
  try {
    await prisma.stack.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Stack deletada com sucesso.' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao deletar stack.' },
      { status: 500 }
    );
  }
}
