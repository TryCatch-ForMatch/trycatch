import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const { email, inviteCode } = await request.json();

    const invite = await prisma.invite.findFirst({
      where: { email, code: inviteCode, used: false },
    });

    if (!invite) {
      return buildResponse({
        success: false,
        message: MESSAGES.REGISTER.INVALID,
        status: 403,
      });
    }
    return buildResponse({
      success: true,
      message: MESSAGES.INVITE.VALID,
      data: {
        email: invite.email,
        role: invite.role,
        code: invite.code,
      },
      status: 200,
    });
  } catch (error) {
    logger.error('Erro de validação:', 'POST /api/auth/register', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.REGISTER.VALIDATION_ERROR,
      status: 500,
    });
  }
}
