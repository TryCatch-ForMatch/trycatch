import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// PUT: validação para trocar a skill associada ao projeto
const updateProjectSkillSchema = z.object({
  skillId: z.string(),
});

// GET /api/project-skill/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  try {
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
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao buscar associação' },
      { status: 500 }
    );
  }
}

// PUT /api/project-skill/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const body = await req.json();
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
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao atualizar skill do projeto' },
      { status: 500 }
    );
  }
}

// DELETE /api/project-skill/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  try {
    await prisma.projectSkill.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: 'Skill removida do projeto com sucesso',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao remover skill' },
      { status: 500 }
    );
  }
}
