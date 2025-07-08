import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';

const idSchema = z.string().min(25, 'ID inválido').max(36, 'ID inválido');

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }
  const projectId = idParse.data;

  try {
    const projectSkill = await prisma.projectSkill.findUnique({
      where: { id: projectId },
      include: { skill: true },
    });

    if (!projectSkill) {
      return NextResponse.json(
        { error: 'Associação não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(projectSkill);
  } catch (error) {
    console.error('Erro no GET /project-skill:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar associação' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  try {
    await prisma.projectSkill.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: 'Skill removida do projeto com sucesso',
    });
  } catch (error) {
    console.error('Erro ao remover skill do projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao remover skill' },
      { status: 500 }
    );
  }
}
