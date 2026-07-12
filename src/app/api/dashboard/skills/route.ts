import { NextResponse } from 'next/server';

import { MESSAGES, buildResponse } from '@/constants/messages';
import { checkAuth } from '@/lib/check-auth';
import { getDashboardSkillsCount } from '@/lib/dashboard-summary';
import { logger } from '@/lib/logger';
import { ROLE_GROUPS } from '@/lib/roles';

export async function GET() {
  const auth = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });

  if (!auth.authorized || !auth.session) return auth.response;

  try {
    const skills = await getDashboardSkillsCount(auth.session.user.id);

    return NextResponse.json({ skills }, { status: 200 });
  } catch (error) {
    logger.error(
      'Erro ao buscar quantidade de skills do dashboard:',
      'GET /api/dashboard/skills',
      {
        error: error instanceof Error ? error.message : String(error),
      }
    );

    return buildResponse({
      success: false,
      message: MESSAGES.SKILL.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}
