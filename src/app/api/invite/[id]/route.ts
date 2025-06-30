import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getIdFromRequest } from '@/utils/url';
import { checkAuth } from '@/lib/check-auth';

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);
  const auth = await checkAuth({ requireAdmin: true });

  if (!auth.authorized) return auth.response;

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
  } catch (error) {
    console.error('Erro ao buscar convite:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar convite.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const id = getIdFromRequest(request);
  const auth = await checkAuth({ requireAdmin: true });

  if (!auth.authorized) return auth.response;

  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error('Erro ao fazer parse do body no PATCH:', error);
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
    const existing = await prisma.invite.findFirst({
      where: {
        email,
        NOT: { id }, // ignora o próprio convite que está sendo atualizado
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Já existe um convite com esse email.' },
        { status: 409 }
      );
    }

    const invite = await prisma.invite.update({
      where: { id },
      data: { email },
    });

    return NextResponse.json(invite);
  } catch (error) {
    console.error('Erro ao atualizar convite:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar convite.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const id = getIdFromRequest(request);
  const auth = await checkAuth({ requireAdmin: true });

  if (!auth.authorized) return auth.response;

  try {
    await prisma.invite.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Convite deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar convite:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar convite.' },
      { status: 500 }
    );
  }
}
