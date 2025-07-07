import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validação do corpo da requisição
const addSkillSchema = z.object({
  skillId: z.string(),
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = addSkillSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const userId = session.user.id;
  const { skillId } = parsed.data;

  try {
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
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao adicionar skill' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  try {
    const skills = await prisma.userSkill.findMany({
      where: { userId: session.user.id },
      include: {
        skill: true,
      },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao buscar skills' },
      { status: 500 }
    );
  }
}
