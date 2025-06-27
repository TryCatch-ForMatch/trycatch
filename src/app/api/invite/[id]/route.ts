import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getIdFromRequest } from '@/utils/url';

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);

  try {
    const invite = await prisma.invite.findUnique({
      where: { id },
    });

    if (!invite) {
      return NextResponse.json(
        { error: 'Convite não encontrado.' },
        { status: 404 }
      );
    }

    return NextResponse.json(invite);
  } catch {
    return NextResponse.json(
      { error: 'Erro ao buscar convite.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const id = getIdFromRequest(request);
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { error: 'O email é obrigatório.' },
      { status: 400 }
    );
  }

  try {
    const invite = await prisma.invite.update({
      where: { id },
      data: { email },
    });

    return NextResponse.json(invite);
  } catch {
    return NextResponse.json(
      { error: 'Erro ao atualizar convite.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const id = getIdFromRequest(request);

  try {
    await prisma.invite.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Convite deletado com sucesso.' });
  } catch {
    return NextResponse.json(
      { error: 'Erro ao deletar convite.' },
      { status: 500 }
    );
  }
}
