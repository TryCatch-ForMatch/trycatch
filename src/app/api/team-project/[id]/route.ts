import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
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

  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: Params) {
  const data = await request.json();
  const { name, description, deadline, totalValue, status, skills, stacks } =
    data;

  const existing = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!existing) {
    return NextResponse.json(
      { error: 'Projeto não encontrado' },
      { status: 404 }
    );
  }

  const updated = await prisma.project.update({
    where: { id: params.id },
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
}

export async function DELETE(_request: Request, { params }: Params) {
  const existing = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!existing) {
    return NextResponse.json(
      { error: 'Projeto não encontrado' },
      { status: 404 }
    );
  }

  await prisma.project.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: 'Projeto deletado com sucesso' });
}
