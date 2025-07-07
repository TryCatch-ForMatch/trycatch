import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const skillId = searchParams.get('skillId');

  if (!userId && !skillId) {
    return NextResponse.json(
      { error: 'Informe userId ou skillId' },
      { status: 400 }
    );
  }

  try {
    if (userId) {
      const skills = await prisma.userSkill.findMany({
        where: { userId },
        include: { skill: true },
      });
      return NextResponse.json(skills);
    }

    if (skillId) {
      const users = await prisma.userSkill.findMany({
        where: { skillId },
        include: { user: true },
      });
      return NextResponse.json(users);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await checkAuth();
  if (!auth.authorized) return auth.response;

  try {
    const userSkill = await prisma.userSkill.findUnique({
      where: { id: params.id },
    });

    if (!userSkill) {
      return NextResponse.json(
        { error: 'Skill não encontrada' },
        { status: 404 }
      );
    }

    if (userSkill.userId !== params.id) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    await prisma.userSkill.delete({ where: { id: params.id } });

    return NextResponse.json({ message: 'Skill removida com sucesso' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao remover skill' },
      { status: 500 }
    );
  }
}
