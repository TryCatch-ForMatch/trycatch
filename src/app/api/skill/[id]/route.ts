import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getIdFromRequest } from '@/utils/url';

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);

  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill não encontrada.' },
        { status: 404 }
      );
    }

    return NextResponse.json(skill);
  } catch {
    return NextResponse.json(
      { error: 'Erro ao buscar skill.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const id = getIdFromRequest(request);
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json(
      { error: 'O nome é obrigatório.' },
      { status: 400 }
    );
  }

  try {
    const skill = await prisma.skill.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(skill);
  } catch {
    return NextResponse.json(
      { error: 'Erro ao atualizar skill.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const id = getIdFromRequest(request);

  try {
    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Skill deletada com sucesso.' });
  } catch {
    return NextResponse.json(
      { error: 'Erro ao deletar skill.' },
      { status: 500 }
    );
  }
}
