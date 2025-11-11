import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { checkProjectStatus } from '@/lib/check-project-status';
import { ROLE_GROUPS } from '@/lib/roles';

const idSchema = z.string().min(25, 'ID inválido').max(36, 'ID inválido');

const updateStatusSchema = z.object({
  id: idSchema,
  status: z.nativeEnum(ProjectStatus),
});

const updateProjectSchema = z.object({
  id: idSchema,
  name: z.string().min(1, 'O nome é obrigatório.'),
  description: z.string().min(1, 'A descrição é obrigatória.'),
  deadline: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Data inválida.' }),
  totalValue: z.number({
    invalid_type_error: 'Valor total deve ser um número.',
  }),
  status: z.nativeEnum(ProjectStatus),
  skills: z.array(z.string().min(1, 'ID inválido.')),
  stacks: z
    .array(
      z.object({
        stackId: z.string().min(1, 'ID inválido.'),
        percentage: z.number().min(0).max(100),
      })
    )
    .optional(),
});

export async function GET(request: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  try {
    // Projetos criados pelo usuário
    const createdProjects = await prisma.project.findMany({
      where: { ownerId: session.user.id },
      include: {
        skills: { include: { skill: true } },
        stacks: true,
        stacksTaken: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Projetos que o usuário assumiu via StackTaken
    const takenRecords = await prisma.stackTaken.findMany({
      where: { userId: session.user.id },
      select: { projectId: true },
    });

    const projectIdsFromTaken = Array.from(
      new Set(takenRecords.map((r) => r.projectId))
    );

    // Exclui os projetos que o usuário já criou para não duplicar
    const projectsFromTaken = await prisma.project.findMany({
      where: {
        id: { in: projectIdsFromTaken },
        NOT: { ownerId: session.user.id },
      },
      include: {
        skills: { include: { skill: true } },
        stacks: true,
        stacksTaken: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Função para formatar projetos no estilo summary
    const formatProject = (p: (typeof createdProjects)[0]) => ({
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
    });

    const result = {
      createdProjects: createdProjects.map(formatProject),
      joinedProjects: projectsFromTaken.map(formatProject),
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[team-project/user GET] Erro:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}

export async function PATCH(request: NextRequest) {
  // PATCH -> alterar somente o status do projeto (ex: marcar como CONCLUIDO)
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const body = await request.json().catch(() => null);
  const parsed = updateStatusSchema.safeParse(body);

  if (!parsed.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: parsed.success ? null : parsed.error.errors.map((e) => e.message),
    });
  }

  const { id: projectId, status } = parsed.data;

  try {
    const existing = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!existing) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT.NOT_FOUND,
        status: 404,
      });
    }

    if (existing.ownerId !== session.user.id && session.user.role !== 'ADMIN') {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.UNAUTHORIZED,
        status: 403,
        errors: ['Você não tem permissão para alterar o status deste projeto.'],
      });
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: { status },
    });

    // se houver lógica de verificação pós-update
    await checkProjectStatus(projectId);

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('[team-project/user PATCH] Erro ao alterar status:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}
