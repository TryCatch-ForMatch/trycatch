import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';

const createStackSchema = z.object({
  name: z.string().min(1, 'O nome da stack é obrigatório.'),
});

export async function GET() {
  try {
    const stacks = await prisma.stack.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(stacks, { status: 200 });
  } catch (error) {
    console.log(error);
    return buildResponse({
      success: false,
      message: MESSAGES.TECH_STACK.INTERNAL_ERROR,
      status: 500,
      errors: [
        error instanceof Error ? error.message : 'Erro ao buscar stacks.',
      ],
    });
  }
}

export async function POST(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const parse = createStackSchema.safeParse(body);

    if (!parse.success) {
      return buildResponse({
        success: false,
        message: MESSAGES.GENERAL.INVALID_DATA,
        status: 400,
        errors: parse.error.errors.map((e) => e.message),
      });
    }

    const { name } = parse.data;
    const existingStack = await prisma.stack.findUnique({ where: { name } });
    if (existingStack) {
      return buildResponse({
        success: false,
        message: MESSAGES.TECH_STACK.ALREADY_EXISTS,
        status: 409,
      });
    }

    const stack = await prisma.stack.create({
      data: { name },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.TECH_STACK.CREATED,
      data: stack,
      status: 201,
    });
  } catch (error) {
    console.error('Erro ao criar stack:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.TECH_STACK.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : 'Erro ao criar stack.'],
    });
  }
}
