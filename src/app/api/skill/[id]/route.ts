import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getIdFromRequest } from '@/utils/url';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { logger } from '@/lib/logger';

const idSchema = z.string().min(1, 'ID inválido.');
const updateSkillSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  iconUrl: z.string().url('A URL do ícone deve ser válida.').optional(),
  forceUpdate: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      errors: idParse.error.format(),
      status: 400,
    });
  }

  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return buildResponse({
        success: false,
        message: MESSAGES.SKILL.NOT_FOUND,
        status: 404,
      });
    }

    return NextResponse.json(skill, { status: 200 });
  } catch {
    return buildResponse({
      success: false,
      message: MESSAGES.SKILL.INTERNAL_ERROR,
      status: 500,
      errors: { message: 'Erro ao buscar skill.' },
    });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      errors: idParse.error.format(),
      status: 400,
    });
  }

  const body = await request.json();
  const parse = updateSkillSchema.safeParse(body);

  if (!parse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: parse.error.format(),
      status: 400,
    });
  }

  const { name, iconUrl, forceUpdate } = parse.data;

  try {
    const existing = await prisma.skill.findFirst({
      where: {
        name,
        NOT: { id }, // ignora a própria skill que está sendo atualizada
      },
    });

    if (existing) {
      return buildResponse({
        success: false,
        message: MESSAGES.SKILL.ALREADY_EXISTS,
        status: 409,
      });
    }

    const linkedProjectSkill = await prisma.projectSkill.findFirst({
      where: { skillId: id },
    });

    const linkedUserSkill = await prisma.userSkill.findFirst({
      where: { skillId: id },
    });
    if ((linkedProjectSkill || linkedUserSkill) && !forceUpdate) {
      return buildResponse({
        success: false,
        message: MESSAGES.SKILL.UPDATE_CONFLICT,
        status: 409,
      });
    }

    const skill = await prisma.skill.update({
      where: { id },
      data: { name, iconUrl },
    });

    return NextResponse.json(skill, { status: 200 });
  } catch (error) {
    logger.error('Erro ao atualizar skill:', 'PATCH /api/skill/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.SKILL.INTERNAL_ERROR,
      status: 500,
      errors: { message: 'Erro ao atualizar skill.' },
    });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      errors: idParse.error.format(),
      status: 400,
    });
  }

  try {
    const userSkills = await prisma.userSkill.findFirst({
      where: { skillId: id },
    });
    const projectSkills = await prisma.projectSkill.findFirst({
      where: { skillId: id },
    });

    if (userSkills || projectSkills) {
      return buildResponse({
        success: false,
        message: MESSAGES.SKILL.DELETE_ERROR,
        status: 400,
        errors: {
          message: 'Não é possível deletar uma skill que está em uso.',
        },
      });
    }
    await prisma.skill.delete({
      where: { id },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.SKILL.DELETED,
      status: 200,
    });
  } catch (error) {
    logger.error('Erro ao deletar skill:', 'DELETE /api/skill/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.SKILL.INTERNAL_ERROR,
      status: 500,
      errors: { message: 'Erro ao deletar skill.' },
    });
  }
}
