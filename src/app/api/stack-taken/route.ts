import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createStackTakenSchema = z.object({
  projectId: z.string().uuid('ID do projeto inválido.'),
  projectStackId: z.string().uuid('ID do projectStack inválido.'),
  stackId: z.string().uuid('ID da stack inválido.'),
});

export async function POST(req: Request) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

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
    console.error('Erro ao criar StackTaken:', error);
    return NextResponse.json(
      { error: 'Erro ao criar StackTaken' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

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
    console.error('Erro ao buscar StackTakens:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar StackTakens' },
      { status: 500 }
    );
  }
}
