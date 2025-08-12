import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';

const createSkillSchema = z.object({
  name: z.string().min(1, 'O nome da skill é obrigatório.'),
  iconUrl: z.string().url('A URL do ícone deve ser válida.').optional(),
});

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(skills, { status: 200 });
  } catch (error) {
    console.log(error);
    return buildResponse({
      success: false,
      message: MESSAGES.SKILL.INTERNAL_ERROR,
      status: 500,
      errors: { message: 'Erro ao buscar skills.' },
    });
  }
}

export async function POST(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const parse = createSkillSchema.safeParse(body);

    if (!parse.success) {
      return buildResponse({
        success: false,
        message: MESSAGES.GENERAL.INVALID_DATA,
        status: 400,
        errors: parse.error.flatten().fieldErrors,
      });
    }

    const { name, iconUrl } = parse.data;
    const existingSkill = await prisma.skill.findUnique({ where: { name } });
    if (existingSkill) {
      return buildResponse({
        success: false,
        message: MESSAGES.SKILL.ALREADY_EXISTS,
        status: 409,
      });
    }

    const skill = await prisma.skill.create({
      data: { name, iconUrl },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.SKILL.CREATED,
      data: skill,
      status: 201,
    });
  } catch (error) {
    console.error('Erro ao criar skill:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.SKILL.INTERNAL_ERROR,
      status: 500,
      errors: { message: 'Erro ao criar skill.' },
    });
  }
}
