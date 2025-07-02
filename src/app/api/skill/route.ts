import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';

const createSkillSchema = z.object({
  name: z.string().min(1, 'O nome da skill é obrigatório.'),
});

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao buscar skills.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const parse = createSkillSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: parse.error.format() },
        { status: 400 }
      );
    }

    const { name } = parse.data;
    const existingSkill = await prisma.skill.findUnique({ where: { name } });
    if (existingSkill) {
      return NextResponse.json(
        { error: 'Já existe uma skill com esse nome.' },
        { status: 409 }
      );
    }

    const skill = await prisma.skill.create({
      data: { name },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar skill:', error);
    return NextResponse.json(
      { error: 'Erro ao criar skill.' },
      { status: 500 }
    );
  }
}
