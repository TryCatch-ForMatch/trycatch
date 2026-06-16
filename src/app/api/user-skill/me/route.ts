import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';

export async function GET() {
  const auth = await checkAuth();
  if (!auth.authorized || !auth.session) return auth.response;

  try {
    const userSkills = await prisma.userSkill.findMany({
      where: { userId: auth.session.user.id },
      include: { skill: true },
    });

    return NextResponse.json(userSkills, { status: 200 });
  } catch (error) {
    logger.error('Error fetching user skills:', 'GET /api/user-skill/me', {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: 'Erro ao buscar suas skills' },
      { status: 500 }
    );
  }
}
