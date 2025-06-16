import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const userId = session.user.id;
  const userSkillId = params.id;

  try {
    const userSkill = await prisma.userSkill.findUnique({
      where: { id: userSkillId },
    });

    if (!userSkill || userSkill.userId !== userId) {
      return NextResponse.json(
        { error: 'Skill não encontrada ou acesso negado' },
        { status: 404 }
      );
    }

    await prisma.userSkill.delete({
      where: { id: userSkillId },
    });

    return NextResponse.json({ message: 'Skill removida com sucesso' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao remover skill' },
      { status: 500 }
    );
  }
}
