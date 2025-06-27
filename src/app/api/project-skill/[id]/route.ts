import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateProjectSkillSchema = z.object({
  skillId: z.string(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const projectSkill = await prisma.projectSkill.findUnique({
      where: { id: params.id },
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  let session;
  try {
    session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }
  } catch (error) {
    console.error('Erro ao obter sessão no PUT:', error);
    return NextResponse.json(
      { error: 'Erro de autenticação' },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.error('Erro ao fazer parse do body no PUT:', error);
    return NextResponse.json(
      { error: 'Body inválido. Envie um JSON válido.' },
      { status: 400 }
    );
  }

  const parsed = updateProjectSkillSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { skillId } = parsed.data;

  try {
    const existing = await prisma.projectSkill.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Associação não encontrada' },
        { status: 404 }
      );
    }

    const updated = await prisma.projectSkill.update({
      where: { id: params.id },
      data: { skillId },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Erro ao atualizar skill do projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar skill do projeto' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

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
