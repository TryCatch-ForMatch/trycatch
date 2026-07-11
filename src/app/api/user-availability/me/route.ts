import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { NextResponse } from 'next/server';
import { buildResponse, MESSAGES } from '@/constants/messages';
import { ROLE_GROUPS } from '@/lib/roles';
import { logger } from '@/lib/logger';

const CONTEXT = 'GET /api/user-availability/me';

export async function GET() {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        linkedin: true,
        github: true,
        bio: true,
        // pega disponibilidades
        availability: {
          select: {
            id: true,
            weekday: true,
            startTime: true,
            endTime: true,
          },
          orderBy: { weekday: 'asc' },
        },
        // skills removed from this endpoint
      },
    });

    if (!user) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER_AVAILABILITY.NOT_FOUND,
        status: 404,
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    logger.error('Unexpected error fetching user availability', CONTEXT, {
      userId: session.user.id,
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.USER_AVAILABILITY.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao buscar disponibilidade do usuário'],
    });
  }
}
