import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';

const idSchema = z.string().min(25, 'ID inválido').max(36, 'ID inválido');
const updateProjectSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  description: z.string().min(1, 'A descrição é obrigatória.'),
  deadline: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Data inválida.' }),
  totalValue: z.number({
    invalid_type_error: 'Valor total deve ser um número.',
  }),
  status: z.enum(['BUSCANDO', 'EM_ANDAMENTO', 'COMPLETO']),
  skills: z.array(z.string().uuid('ID da skill inválido')).optional(),
  stacks: z
    .array(
      z.object({
        stackId: z.string().uuid('ID da stack inválido'),
        percentage: z.number().min(0).max(100),
      })
    )
    .optional(),
});

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }
  const projectId = idParse.data;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
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

    if (project.ownerId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar projeto.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const projectId = idParse.data;

  const body = await request.json();
  const parse = updateProjectSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.format() }, { status: 400 });
  }

  try {
    const existing = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    if (existing.ownerId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Você não tem permissão para editar este projeto.' },
        { status: 403 }
      );
    }

    const { name, description, deadline, totalValue, status, skills, stacks } =
      parse.data;

    const updated = await prisma.project.update({
      where: { id: projectId },
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
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const projectId = idParse.data;

  try {
    const existing = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    if (existing.ownerId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Você não tem permissão para deletar este projeto.' },
        { status: 403 }
      );
    }
    await prisma.projectSkill.deleteMany({ where: { projectId } });
    await prisma.projectStack.deleteMany({ where: { projectId } });
    await prisma.project.delete({ where: { id: projectId } });

    return NextResponse.json({ message: 'Projeto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar projeto.' },
      { status: 500 }
    );
  }
}
