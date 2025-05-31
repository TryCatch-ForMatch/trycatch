import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Obter uma skill por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id: params.id },
    });

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill não encontrada.' },
        { status: 404 }
      );
    }

    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar skill.' },
      { status: 500 }
    );
  }
}

// PATCH - Atualizar uma skill
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'O nome é obrigatório.' },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar skill.' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar uma skill
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.skill.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Skill deletada com sucesso.' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar skill.' },
      { status: 500 }
    );
  }
}
