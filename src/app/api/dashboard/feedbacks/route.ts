import { NextResponse } from 'next/server';

import { MESSAGES, buildResponse } from '@/constants/messages';
import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { ROLE_GROUPS } from '@/lib/roles';

export async function GET() {
  const auth = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });

  if (!auth.authorized || !auth.session) return auth.response;

  try {
    const feedbacks = await prisma.feedback.count({
      where: {
        toUserId: auth.session.user.id,
      },
    });

    return NextResponse.json({ feedbacks }, { status: 200 });
  } catch (error) {
    logger.error(
      'Erro ao buscar quantidade de feedbacks do dashboard:',
      'GET /api/dashboard/feedbacks',
      {
        error: error instanceof Error ? error.message : String(error),
      }
    );

    return buildResponse({
      success: false,
      message: MESSAGES.FEEDBACK.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}
