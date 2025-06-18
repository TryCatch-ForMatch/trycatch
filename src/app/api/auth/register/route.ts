import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, code } = await req.json();

  // Verifica se o convite existe e está válido
  const invite = await prisma.invite.findFirst({
    where: { email, code, used: false },
  });

  if (!invite) {
    return NextResponse.json(
      { error: 'Convite inválido ou já utilizado.' },
      { status: 403 }
    );
  }

  // Convite válido, pode prosseguir para cadastro
  return NextResponse.json({ message: 'Convite válido.' }, { status: 200 });
}
