import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.invite.count({
      where: {
        used: false,
      },
    });
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Erro ao buscar número de convites:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar convites' },
      { status: 500 }
    );
  }
}
