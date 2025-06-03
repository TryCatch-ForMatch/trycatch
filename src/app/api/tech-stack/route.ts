import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Listar todas as stacks
export async function GET() {
  try {
    const stacks = await prisma.stack.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(stacks);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Erro ao buscar stacks.' },
      { status: 500 }
    );
  }
}

// POST - Criar uma nova stack
export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'O nome da stack é obrigatório.' },
        { status: 400 }
      );
    }

    const stack = await prisma.stack.create({
      data: { name },
    });

    return NextResponse.json(stack, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Erro ao criar stack.' },
      { status: 500 }
    );
  }
}
