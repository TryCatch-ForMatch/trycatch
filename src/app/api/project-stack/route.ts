import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';

// Validação de criação
const createProjectStackSchema = z.object({
  projectId: z.string(),
  stackId: z.string(),
  percentage: z.number().min(0).max(100),
});

export async function POST(request: NextRequest) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error('Erro ao fazer parse do JSON no POST:', error);
    return NextResponse.json(
      { error: 'Body inválido. Envie um JSON válido.' },
      { status: 400 }
    );
  }

  const parsed = createProjectStackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { projectId, stackId, percentage } = parsed.data;

  try {
    const [project, stack] = await Promise.all([
      prisma.project.findUnique({ where: { id: projectId } }),
      prisma.stack.findUnique({ where: { id: stackId } }),
    ]);

    if (!project || !stack) {
      return NextResponse.json(
        { error: 'Projeto ou Stack não encontrados' },
        { status: 404 }
      );
    }

    const existingStacks = await prisma.projectStack.findMany({
      where: { projectId },
    });

    const total =
      existingStacks.reduce((acc, item) => acc + item.percentage, 0) +
      percentage;

    if (total > 100) {
      return NextResponse.json(
        {
          error: 'A soma dos percentuais das stacks não pode ultrapassar 100%',
        },
        { status: 400 }
      );
    }

    const newProjectStack = await prisma.projectStack.create({
      data: {
        projectId,
        stackId,
        percentage,
      },
    });

    return NextResponse.json(newProjectStack, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar ProjectStack:', error);
    return NextResponse.json(
      { error: 'Erro ao criar ProjectStack' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  let projectId: string | null = null;
  try {
    const { searchParams } = new URL(request.url);
    projectId = searchParams.get('projectId');
  } catch (error) {
    console.error('Erro ao processar URL no GET:', error);
    return NextResponse.json({ error: 'URL inválida' }, { status: 400 });
  }

  if (!projectId) {
    return NextResponse.json(
      { error: 'projectId é obrigatório' },
      { status: 400 }
    );
  }

  try {
    const stacks = await prisma.projectStack.findMany({
      where: { projectId },
      include: {
        stack: true,
      },
    });

    return NextResponse.json(stacks);
  } catch (error) {
    console.error('Erro ao buscar ProjectStacks:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar ProjectStacks' },
      { status: 500 }
    );
  }
}
