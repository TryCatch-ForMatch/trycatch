import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getIdFromRequest } from '@/utils/url';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';

const idSchema = z.string().min(1, 'ID inválido.');
const updateSkillSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
});

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
  }

  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill não encontrada.' },
        { status: 404 }
      );
    }

    return NextResponse.json(skill);
  } catch {
    return NextResponse.json(
      { error: 'Erro ao buscar skill.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
  }

  const body = await request.json();
  const parse = updateSkillSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error.format() }, { status: 400 });
  }

  const { name } = parse.data;

  try {
    const existing = await prisma.skill.findFirst({
      where: {
        name,
        NOT: { id }, // ignora a própria skill que está sendo atualizada
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Já existe uma skill com esse nome.' },
        { status: 409 }
      );
    }
    const skill = await prisma.skill.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error('Erro ao atualizar skill:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar skill.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  const id = getIdFromRequest(request);

  const idParse = idSchema.safeParse(id);
  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
  }

  try {
    const userSkills = await prisma.userSkill.findFirst({
      where: { skillId: id },
    });
    const projectSkills = await prisma.projectSkill.findFirst({
      where: { skillId: id },
    });

    if (userSkills || projectSkills) {
      return NextResponse.json(
        { error: 'Não é possível deletar uma skill que está em uso.' },
        { status: 400 }
      );
    }
    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Skill deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar skill:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar skill.' },
      { status: 500 }
    );
  }
}
