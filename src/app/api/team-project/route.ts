import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { checkProjectStatus } from '@/lib/check-project-status';
import { ROLE_GROUPS } from '@/lib/roles';

const createProjectSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  deadline: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Data inválida'),
  totalValue: z
    .number()
    .nonnegative('O valor total deve ser um número positivo'),
  status: z.enum(ProjectStatus),
  skills: z.array(z.string().min(1, 'ID inválido.')).optional(),
  stacks: z
    .array(
      z.object({
        stackId: z.string().min(1, 'ID inválido.'),
        percentage: z.number().min(0).max(100),
      })
    )
    .optional(),
});

export async function GET() {
  const { authorized, response } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
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

  // Atualiza o status de cada projeto conforme regras
  await Promise.all(
    projects.map(async (project) => {
      await checkProjectStatus(project.id);
    })
  );

  // Busca novamente os projetos após possível atualização de status
  const updatedProjects = await prisma.project.findMany({
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

  return NextResponse.json(updatedProjects, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const body = await request.json();
  const parse = createProjectSchema.safeParse(body);

  if (!parse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: parse.error.format(),
      status: 400,
    });
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

  return buildResponse({
    success: true,
    message: MESSAGES.PROJECT.CREATED,
    data: project,
    status: 201,
  });
}
