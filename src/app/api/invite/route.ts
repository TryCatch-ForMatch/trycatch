import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { checkAuth } from '@/lib/check-auth';

export async function GET() {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const invites = await prisma.invite.findMany({
      orderBy: { email: 'asc' },
    });
    return NextResponse.json(invites);
  } catch (error) {
    console.error('Erro ao buscar convites:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar convites.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error('Erro ao fazer parse do JSON:', error);
    return NextResponse.json(
      { error: 'Body inválido. Envie um JSON válido.' },
      { status: 400 }
    );
  }

  const { email } = body;

  if (!email) {
    return NextResponse.json(
      { error: 'O email é obrigatório.' },
      { status: 400 }
    );
  }

  try {
    const code = crypto.randomBytes(8).toString('hex');

    const invite = await prisma.invite.create({
      data: { email, code },
    });

    return NextResponse.json(invite, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar convite:', error);
    return NextResponse.json(
      { error: 'Erro ao criar convite.' },
      { status: 500 }
    );
  }
}
