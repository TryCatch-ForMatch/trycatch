import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';
import { buildResponse, MESSAGES } from '@/constants/messages';
import { logger } from '@/lib/logger';

const userSkillSchema = z.object({
  userId: z.string(),
  skillId: z.string(),
});

export async function POST(request: NextRequest) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  let body;

  try {
    body = await request.json();
  } catch (error) {
    logger.error(
      'Erro ao fazer parse do JSON no POST:',
      'POST /api/user-skill',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: ['Body inválido. Envie um JSON válido.'],
    });
  }

  const parsed = userSkillSchema.safeParse(body);
  if (!parsed.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: ['Dados inválidos', parsed.error.issues],
    });
  }

  const { userId, skillId } = parsed.data;

  try {
    const [user, skill] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.skill.findUnique({ where: { id: skillId } }),
    ]);

    if (!user || !skill) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER_SKILL.NOT_FOUND,
        status: 404,
      });
    }

    const alreadyExists = await prisma.userSkill.findFirst({
      where: { userId, skillId },
    });

    if (alreadyExists) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER_SKILL.ALREADY_EXISTS,
        status: 400,
      });
    }

    const newUserSkill = await prisma.userSkill.create({
      data: {
        userId,
        skillId,
      },
    });

    return NextResponse.json(newUserSkill, { status: 201 });
  } catch (error) {
    logger.error('Erro ao criar UserSkill:', 'POST /api/user-skill', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.USER_SKILL.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao adicionar skill'],
    });
  }
}

export async function GET() {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  try {
    const allUserSkills = await prisma.userSkill.findMany({
      include: {
        user: true,
        skill: true,
      },
    });

    return NextResponse.json(allUserSkills, { status: 200 });
  } catch (error) {
    logger.error('Unexpected error', 'GET /api/user-skill', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.USER_SKILL.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao buscar vínculos de skills'],
    });
  }
}
