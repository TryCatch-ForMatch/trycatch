import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getIdFromRequest } from '@/utils/url';
import jwt from 'jsonwebtoken';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function getUserFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
  } catch {
    return null;
  }
  const projectId = idParse.data;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        owner: { select: { id: true, name: true, avatar: true } },
        skills: { include: { skill: true } },
        stacks: { include: { stack: true } },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    if (project.ownerId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar projeto.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  let session;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error('Erro ao obter sessão:', error);
    return NextResponse.json(
      { error: 'Erro de autenticação' },
      { status: 500 }
    );
  }

  const projectId = idParse.data;

  const { id: projectId } = await context.params;
  const data = await request.json();
  const { name, description, deadline, totalValue, status, skills, stacks } =
    data;

  try {
    const existing = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    if (existing.ownerId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Você não tem permissão para editar este projeto.' },
        { status: 403 }
      );
    }

    const { name, description, deadline, totalValue, status, skills, stacks } =
      parse.data;

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        name,
        description,
        deadline: new Date(deadline),
        totalValue,
        status,
        skills: {
          deleteMany: {},
          create: skills?.map((skillId: string) => ({
            skill: { connect: { id: skillId } },
          })),
        },
        stacks: {
          deleteMany: {},
          create: stacks?.map(
            (item: { stackId: string; percentage: number }) => ({
              stack: { connect: { id: item.stackId } },
              percentage: item.percentage,
            })
          ),
        },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id: projectId } = await context.params;

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

  try {
    const existing = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    if (existing.ownerId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Você não tem permissão para deletar este projeto.' },
        { status: 403 }
      );
    }
    await prisma.projectSkill.deleteMany({ where: { projectId } });
    await prisma.projectStack.deleteMany({ where: { projectId } });
    await prisma.project.delete({ where: { id: projectId } });

    return NextResponse.json({ message: 'Projeto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar projeto.' },
      { status: 500 }
    );
  }
}
