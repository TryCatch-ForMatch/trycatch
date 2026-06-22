import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { checkProjectStatus } from '@/lib/check-project-status';
import { ROLE_GROUPS } from '@/lib/roles';
import { logger } from '@/lib/logger';

const idSchema = z.string().min(25, 'ID inválido').max(36, 'ID inválido');
const updateProjectSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  description: z.string().min(1, 'A descrição é obrigatória.'),
  deadline: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: 'Data inválida.',
  }),
  totalValue: z.number({
    invalid_type_error: 'Valor total deve ser um número.',
  }),
  status: z.nativeEnum(ProjectStatus),
  skills: z.array(z.string().min(1, 'ID inválido.')),
  github: z.string().url('URL inválida').optional().or(z.literal('')),
  stacks: z
    .array(
      z.object({
        stackId: z.string().min(1, 'ID inválido.'),
        percentage: z.number().min(0).max(100),
      })
    )
    .optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const { id } = context.params;

  const idParse = idSchema.safeParse(id);

  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }
  const projectId = idParse.data;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        owner: { select: { id: true, name: true, avatar: true } },
        skills: { include: { skill: true } },
        stacks: {
          include: {
            stack: true,
            StackTaken: {
              include: {
                user: { select: { id: true, name: true, avatar: true } },
              },
            },
          },
        },
      },
    });

    if (!project) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT.NOT_FOUND,
        status: 404,
      });
    }

    const formatted = {
      id: project.id,
      name: project.name,
      description: project.description,
      github: project.github || null,
      deadline: project.deadline.toISOString(),
      totalValue: project.totalValue,
      status: project.status,
      owner: project.owner,
      skills: project.skills.map((ps) => ({
        id: ps.skill.id,
        name: ps.skill.name,
        iconUrl: ps.skill.iconUrl,
      })),
      stacks: project.stacks.map((s) => {
        const taken = s.StackTaken[0]; // só pode haver 1 taken por stack
        return {
          id: s.id,
          stackId: s.stackId,
          name: s.stack.name,
          percentage: s.percentage,
          takenBy: taken
            ? {
                id: taken.user.id,
                name: taken.user.name,
                avatar: taken.user.avatar,
                stackTakenId: taken.id,
              }
            : null,
        };
      }),
    };

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    logger.error('Erro ao buscar projeto:', 'GET /api/team-project/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);

  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }

  const projectId = idParse.data;

  const body = await request.json();
  const parse = updateProjectSchema.safeParse(body);
  if (!parse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: parse.error.errors.map((e) => e.message),
    });
  }

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
        errors: ['Você não tem permissão para editar este projeto.'],
      });
    }

    const {
      name,
      description,
      deadline,
      totalValue,
      status,
      skills,
      stacks,
      github,
    } = parse.data;

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        name,
        description,
        deadline: new Date(deadline),
        totalValue,
        status,
        github: github || null,
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

    await checkProjectStatus(projectId);

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    logger.error('Erro ao atualizar projeto:', 'PUT /api/team-project/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);

  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }

  const projectId = idParse.data;

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
        errors: ['Você não tem permissão para deletar este projeto.'],
      });
    }
    await prisma.projectSkill.deleteMany({ where: { projectId } });
    await prisma.projectStack.deleteMany({ where: { projectId } });
    await prisma.project.delete({ where: { id: projectId } });

    return buildResponse({
      success: true,
      message: MESSAGES.PROJECT.DELETED,
      status: 200,
    });
  } catch (error) {
    logger.error('Erro ao deletar projeto:', 'DELETE /api/team-project/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}
