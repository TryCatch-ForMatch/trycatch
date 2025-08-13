import { MESSAGES, buildResponse } from '@/constants/messages';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const count = await prisma.stack.count();

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Erro ao buscar número de stacks:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.TECH_STACK.INTERNAL_ERROR,
      status: 500,
      errors: { error: 'Erro ao buscar número de stacks' },
    });
  }
}
