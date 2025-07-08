import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.stack.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Erro ao buscar número de stacks:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar stacks' },
      { status: 500 }
    );
  }
}
