import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const { authorized, response } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized) return response;

  const projects = await prisma.project.findMany({
    include: {
      skills: {
        include: { skill: true },
      },
      stacks: true,
      stacksTaken: true,
    },
  });

  const result = projects.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    deadline: p.deadline.toISOString(),
    skills: p.skills.map((ps) => ({
      id: ps.skill.id,
      name: ps.skill.name,
      iconUrl: ps.skill.iconUrl,
    })),
    stacksFilled: p.stacksTaken.length,
    stacksTotal: p.stacks.length,
  }));

  return NextResponse.json(result, { status: 200 });
}
