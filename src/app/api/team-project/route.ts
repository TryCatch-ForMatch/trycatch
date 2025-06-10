import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    include: {
      owner: {
        select: { id: true, name: true, avatar: true },
      },
      skills: {
        include: { skill: true },
      },
      stacks: {
        include: { stack: true },
      },
    },
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const data = await request.json();
  const { name, description, deadline, totalValue, status, skills, stacks } =
    data;

  if (!name || !description || !deadline || !totalValue || !status) {
    return NextResponse.json(
      { error: 'Todos os campos obrigatórios devem ser preenchidos' },
      { status: 400 }
    );
  }

  const project = await prisma.project.create({
    data: {
      ownerId: session.user.id,
      name,
      description,
      deadline: new Date(deadline),
      totalValue,
      status,
      skills: {
        create: skills?.map((skillId: string) => ({
          skill: { connect: { id: skillId } },
        })),
      },
      stacks: {
        create: stacks?.map(
          (item: { stackId: string; percentage: number }) => ({
            stack: { connect: { id: item.stackId } },
            percentage: item.percentage,
          })
        ),
      },
    },
  });

  return NextResponse.json(project, { status: 201 });
}
