import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';

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
    console.error('Erro ao fazer parse do JSON no POST:', error);
    return NextResponse.json(
      { error: 'Body inválido. Envie um JSON válido.' },
      { status: 400 }
    );
  }

  const parsed = userSkillSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { userId, skillId } = parsed.data;

  try {
    const [user, skill] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.skill.findUnique({ where: { id: skillId } }),
    ]);

    if (!user || !skill) {
      return NextResponse.json(
        { error: 'Usuário ou Skill não encontrados' },
        { status: 404 }
      );
    }

    const alreadyExists = await prisma.userSkill.findFirst({
      where: { userId, skillId },
    });

    if (alreadyExists) {
      return NextResponse.json(
        { error: 'Skill já adicionada' },
        { status: 400 }
      );
    }

    const newUserSkill = await prisma.userSkill.create({
      data: {
        userId,
        skillId,
      },
    });

    return NextResponse.json(newUserSkill, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar UserSkill:', error);
    return NextResponse.json(
      { error: 'Erro ao adicionar skill' },
      { status: 500 }
    );
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

    return NextResponse.json(allUserSkills);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao buscar vínculos de skills' },
      { status: 500 }
    );
  }
}
