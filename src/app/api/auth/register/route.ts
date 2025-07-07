import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, inviteCode } = await request.json();

    const invite = await prisma.invite.findFirst({
      where: { email, code: inviteCode, used: false },
    });

    if (!invite) {
      return NextResponse.json(
        { error: 'Convite inválido ou já utilizado.' },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: 'Convite válido.' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao validar convite:', error);
    return NextResponse.json(
      { error: 'Erro interno ao validar convite.' },
      { status: 500 }
    );
  }
}
