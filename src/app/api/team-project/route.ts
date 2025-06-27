import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';

export async function GET() {
  const { authorized, response } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized) return response;

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
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

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
