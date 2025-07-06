import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';

const createStackSchema = z.object({
  name: z.string().min(1, 'O nome da stack é obrigatório.'),
});

export async function GET() {
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

export async function POST(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const parse = createStackSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: parse.error.format() },
        { status: 400 }
      );
    }

    const { name } = parse.data;
    const existingStack = await prisma.stack.findUnique({ where: { name } });
    if (existingStack) {
      return NextResponse.json(
        { error: 'Já existe uma stack com esse nome.' },
        { status: 409 }
      );
    }

    const stack = await prisma.stack.create({
      data: { name },
    });

    return NextResponse.json(stack, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar stack:', error);
    return NextResponse.json(
      { error: 'Erro ao criar stack.' },
      { status: 500 }
    );
  }
}
