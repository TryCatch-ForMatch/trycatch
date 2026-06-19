import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { NextResponse, NextRequest } from 'next/server';
import { ROLE_GROUPS } from '@/lib/roles';
import { z } from 'zod';
import { Prisma, ProjectStatus } from '@prisma/client';
import { buildResponse, MESSAGES } from '@/constants/messages';

export async function GET(req: NextRequest) {
  const { authorized, response } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized) return response;

  // Pega o parâmetro de consulta 'status'
  const { searchParams } = new URL(req.url);
  const statusParam = searchParams.get('status');

  // Validação com Zod para garantir que o status seja válido
  const statusSchema = z.nativeEnum(ProjectStatus).optional();
  const parsed = statusSchema.safeParse(statusParam);

  if (!parsed.success && statusParam) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: { status: 'Status inválido' },
      status: 400,
    });
  }

  // Aqui criamos o filtro condicional e convertemos o status para o tipo correto
  const where = parsed.data ? { status: parsed.data as ProjectStatus } : {};

  const projects = await prisma.project.findMany({
    where,
    include: {
      skills: { include: { skill: true } },
      stacks: true,
      stacksTaken: true,
    },
  });

  if (projects.length === 0) {
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT.NOT_FOUND,
      status: 404,
    });
  }

  type ProjectWithRelations = Prisma.ProjectGetPayload<{
    include: {
      skills: { include: { skill: true } };
      stacks: true;
      stacksTaken: true;
    };
  }>;

  const result = projects.map((p: ProjectWithRelations) => ({
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
