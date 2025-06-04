import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Acesso negado. Apenas administradores podem criar convites.' },
      { status: 403 }
    );
  }
  try {
    const invites = await prisma.invite.findMany({
      orderBy: { email: 'asc' },
    });
    return NextResponse.json(invites);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao buscar convites.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Acesso negado. Apenas administradores podem criar convites.' },
      { status: 403 }
    );
  }

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'O email é obrigatório.' },
        { status: 400 }
      );
    }

    // Gera um código/token aleatório
    const code = crypto.randomBytes(8).toString('hex');

    const invite = await prisma.invite.create({
      data: { email, code },
    });

    return NextResponse.json(invite, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao criar convite.' },
      { status: 500 }
    );
  }
}
