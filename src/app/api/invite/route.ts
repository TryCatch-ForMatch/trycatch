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
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao buscar convites.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'O email é obrigatório.' },
        { status: 400 }
      );
    }

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
