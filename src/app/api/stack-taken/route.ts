import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validação com Zod - biblioteca TypeScript para validação de dados
const createStackTakenSchema = z.object({
  projectId: z.string(),
  projectStackId: z.string(),
  stackId: z.string(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createStackTakenSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { projectId, projectStackId, stackId } = parsed.data;

  try {
    const newStackTaken = await prisma.stackTaken.create({
      data: {
        userId: session.user.id,
        projectId,
        projectStackId,
        stackId,
      },
    });

    return NextResponse.json(newStackTaken, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao criar StackTaken' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  try {
    const stackTakens = await prisma.stackTaken.findMany({
      where: projectId ? { projectId } : { userId: session.user.id },
      include: {
        stack: true,
        project: true,
        projectStack: true,
      },
    });

    return NextResponse.json(stackTakens);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao buscar StackTakens' },
      { status: 500 }
    );
  }
}
