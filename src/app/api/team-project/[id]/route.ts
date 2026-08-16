import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { checkProjectStatus } from '@/lib/check-project-status';
import { ROLE_GROUPS } from '@/lib/roles';
import { logger } from '@/lib/logger';
import { planProjectStackChanges } from '@/lib/project-stack-update';

const idSchema = z.string().min(25, 'ID inválido').max(36, 'ID inválido');
const updateProjectSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  description: z.string().min(1, 'A descrição é obrigatória.'),
  deadline: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: 'Data inválida.',
  }),
  totalValue: z.number({
    error: 'Valor total deve ser um número.',
  }),
  status: z.enum(ProjectStatus),
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

type StructuralProjectState = {
  name: string;
  deadline: Date;
  totalValue: number;
  skills: { skillId: string }[];
  stacks: { stackId: string; percentage: number }[];
};

type IncomingProjectState = z.infer<typeof updateProjectSchema>;

function sortedValues(values: string[]) {
  return [...values].sort((first, second) => first.localeCompare(second));
}

function hasSameSkills(
  existingSkills: StructuralProjectState['skills'],
  incomingSkills: string[]
) {
  const existing = sortedValues(existingSkills.map((skill) => skill.skillId));
  const incoming = sortedValues(incomingSkills);

  return (
    existing.length === incoming.length &&
    existing.every((skillId, index) => skillId === incoming[index])
  );
}

function hasSameStacks(
  existingStacks: StructuralProjectState['stacks'],
  incomingStacks: NonNullable<IncomingProjectState['stacks']>
) {
  if (existingStacks.length !== incomingStacks.length) return false;

  const incomingByStackId = new Map(
    incomingStacks.map((stack) => [stack.stackId, stack.percentage])
  );

  return existingStacks.every(
    (stack) => incomingByStackId.get(stack.stackId) === stack.percentage
  );
}

function hasStructuralProjectChanges(
  existing: StructuralProjectState,
  incoming: IncomingProjectState
) {
  const incomingStacks = incoming.stacks ?? [];

  return (
    existing.name !== incoming.name ||
    existing.deadline.getTime() !== new Date(incoming.deadline).getTime() ||
    existing.totalValue !== incoming.totalValue ||
    !hasSameSkills(existing.skills, incoming.skills) ||
    !hasSameStacks(existing.stacks, incomingStacks)
  );
}

async function applyProjectStackChanges(
  tx: Prisma.TransactionClient,
  projectId: string,
  incomingStacks: NonNullable<IncomingProjectState['stacks']>
) {
  const existingStacks = await tx.projectStack.findMany({
    where: { projectId },
    select: { id: true, stackId: true, percentage: true },
  });

  const { toUpdate, toCreate, toDelete } = planProjectStackChanges(
    existingStacks,
    incomingStacks
  );

  for (const stackToDelete of toDelete) {
    await tx.stackTaken.deleteMany({
      where: { projectStackId: stackToDelete.id },
    });
    await tx.projectStack.delete({ where: { id: stackToDelete.id } });
  }

  for (const stackToUpdate of toUpdate) {
    await tx.projectStack.update({
      where: { id: stackToUpdate.id },
      data: { percentage: stackToUpdate.percentage },
    });
  }

  for (const stackToCreate of toCreate) {
    await tx.projectStack.create({
      data: {
        projectId,
        stackId: stackToCreate.stackId,
        percentage: stackToCreate.percentage,
      },
    });
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const { id } = params;

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
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(params.id);

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
      errors: parse.error.issues.map((e) => e.message),
    });
  }

  try {
    const existing = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        skills: { select: { skillId: true } },
        stacks: { select: { stackId: true, percentage: true } },
        stacksTaken: { select: { id: true }, take: 1 },
      },
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

    // ------------------------------------------------------------------
    // Bloqueio de edição estrutural — TEMPORARIAMENTE DESATIVADO
    //
    // A regra impedia alterar o projeto depois que alguém assumisse uma stack.
    // Ela está desligada até a plataforma entrar em operação de fato, por dois
    // motivos:
    //
    // 1. O escopo estava largo demais: `hasStructuralProjectChanges` considera
    //    nome, prazo e valor total como "estrutura", travando edições que não
    //    têm relação com a composição da equipe.
    //
    // 2. A comparação de prazo gera falso positivo. O formulário carrega a data
    //    como `deadline.split('T')[0]`, perdendo a hora; o banco guarda o
    //    timestamp completo. Os dois nunca coincidem, então abrir a tela e
    //    salvar sem mudar nada já disparava o bloqueio.
    //
    // Ao reativar, corrija os dois pontos antes.
    // ------------------------------------------------------------------
    const BLOQUEAR_EDICAO_APOS_FORMACAO_DE_EQUIPE = false;

    if (
      BLOQUEAR_EDICAO_APOS_FORMACAO_DE_EQUIPE &&
      existing.stacksTaken.length > 0 &&
      hasStructuralProjectChanges(existing, parse.data)
    ) {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.UNAUTHORIZED,
        status: 403,
        errors: [
          'Não é permitido alterar estrutura do projeto após formação da equipe.',
        ],
      });
    }

    const updated = await prisma.$transaction(async (tx) => {
      await applyProjectStackChanges(tx, projectId, stacks ?? []);

      return tx.project.update({
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
        },
      });
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
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(params.id);

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
