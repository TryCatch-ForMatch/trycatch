import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createStackTakenSchema = z.object({
  projectId: z.string().min(25, 'ID inválido').max(36, 'ID inválido'),
  projectStackId: z.string().min(25, 'ID inválido').max(36, 'ID inválido'),
  stackId: z.string().min(25, 'ID inválido').max(36, 'ID inválido'),
});

export async function POST(request: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const body = await request.json();
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

export async function GET(request: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const { searchParams } = new URL(request.url);
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
