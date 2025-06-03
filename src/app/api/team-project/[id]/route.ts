import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getIdFromRequest } from '@/utils/url';

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);
  const project = await prisma.project.findUnique({
    where: { id },
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

export async function PUT(request: NextRequest) {
  const id = getIdFromRequest(request);
  const data = await request.json();
  const { name, description, deadline, totalValue, status, skills, stacks } =
    data;

  const existing = await prisma.project.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json(
      { error: 'Projeto não encontrado' },
      { status: 404 }
    );
  }

  const updated = await prisma.project.update({
    where: { id },
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

export async function DELETE(request: NextRequest) {
  const id = getIdFromRequest(request);
  const existing = await prisma.project.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json(
      { error: 'Projeto não encontrado' },
      { status: 404 }
    );
  }

  await prisma.project.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Projeto deletado com sucesso' });
}
