import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validação dos dados para criação
const createProjectSkillSchema = z.object({
  projectId: z.string(),
  skillId: z.string(),
});

// POST /api/project-skill
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createProjectSkillSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { projectId, skillId } = parsed.data;

  try {
    const exists = await prisma.projectSkill.findFirst({
      where: { projectId, skillId },
    });

    if (exists) {
      return NextResponse.json(
        { error: 'Skill já associada ao projeto' },
        { status: 400 }
      );
    }

    const newProjectSkill = await prisma.projectSkill.create({
      data: { projectId, skillId },
    });

    return NextResponse.json(newProjectSkill, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao adicionar skill ao projeto' },
      { status: 500 }
    );
  }
}

// GET /api/project-skill?projectId=<id>
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  if (!projectId) {
    return NextResponse.json(
      { error: 'projectId é obrigatório na query' },
      { status: 400 }
    );
  }

  try {
    const skills = await prisma.projectSkill.findMany({
      where: { projectId },
      include: { skill: true },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao buscar skills do projeto' },
      { status: 500 }
    );
  }
}
