import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createProjectSkillSchema = z.object({
  projectId: z.string(),
  skillId: z.string(),
});

export async function POST(req: Request) {
  let session;
  try {
    session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }
  } catch (error) {
    console.error('Erro ao obter sessão no POST:', error);
    return NextResponse.json(
      { error: 'Erro de autenticação' },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.error('Erro ao fazer parse do JSON no POST:', error);
    return NextResponse.json(
      { error: 'Body inválido. Envie um JSON válido.' },
      { status: 400 }
    );
  }

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
    console.error('Erro ao adicionar skill ao projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao adicionar skill ao projeto' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  let session;
  try {
    session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }
  } catch (error) {
    console.error('Erro ao obter sessão no GET:', error);
    return NextResponse.json(
      { error: 'Erro de autenticação' },
      { status: 500 }
    );
  }

  let projectId;
  try {
    const { searchParams } = new URL(req.url);
    projectId = searchParams.get('projectId');
  } catch (error) {
    console.error('Erro ao processar URL no GET:', error);
    return NextResponse.json({ error: 'URL inválida' }, { status: 400 });
  }

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
    console.error('Erro ao buscar skills do projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar skills do projeto' },
      { status: 500 }
    );
  }
}
