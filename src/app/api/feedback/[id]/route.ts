import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { ROLE_GROUPS } from '@/lib/roles';
import { logger } from '@/lib/logger';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const feedbackId = params.id;

  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        fromUser: true,
        toUser: true,
        stackTaken: {
          include: {
            stack: true,
            project: true,
          },
        },
      },
    });

    if (!feedback) {
      return buildResponse({
        success: false,
        message: MESSAGES.FEEDBACK.NOT_FOUND,
        status: 404,
      });
    }

    return NextResponse.json(feedback);
  } catch (error) {
    logger.error('Erro ao buscar feedback:', 'GET /api/feedback/[id]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.FEEDBACK.INTERNAL_ERROR,
      status: 500,
    });
  }
}
