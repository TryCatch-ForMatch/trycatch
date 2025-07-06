import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';

import { z } from 'zod';

const createProjectSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  deadline: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Data inválida'),
  totalValue: z
    .number()
    .nonnegative('O valor total deve ser um número positivo'),
  status: z.enum(['BUSCANDO', 'EM_ANDAMENTO', 'COMPLETO']),
  skills: z.array(z.string().uuid()).optional(),
  stacks: z
    .array(
      z.object({
        stackId: z.string().uuid(),
        percentage: z.number().min(0).max(100),
      })
    )
    .optional(),
});

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

export async function POST(request: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const body = await request.json();
  const parse = createProjectSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error.format() }, { status: 400 });
  }

  const { name, description, deadline, totalValue, status, skills, stacks } =
    parse.data;
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
