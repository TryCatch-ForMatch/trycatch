import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      {
        error: 'Acesso negado. Apenas administradores podem listar stacks.',
      },
      { status: 403 }
    );
  }
  try {
    const stacks = await prisma.stack.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(stacks);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao buscar stacks.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      {
        error: 'Acesso negado. Apenas administradores podem cadastrar stacks.',
      },
      { status: 403 }
    );
  }
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
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao criar stack.' },
      { status: 500 }
    );
  }
}
