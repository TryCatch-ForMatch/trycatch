import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { MESSAGES, buildResponse } from '@/constants/messages';
import crypto from 'crypto';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.INVALID_RESET_TOKEN,
        status: 400,
      });
    }

    // Gera o hash do token recebido
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Busca do banco de dados
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: hashedToken,
      },
    });

    // Token não existe
    if (!resetToken) {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.INVALID_RESET_TOKEN,
        status: 400,
      });
    }

    //Token expirado
    if (resetToken.expiresAt < new Date()) {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.INVALID_RESET_TOKEN,
        status: 400,
      });
    }

    // Token válido
    return buildResponse({
      success: true,
      message: MESSAGES.AUTH.VALID_RESET_TOKEN,
      status: 200,
    });
  } catch (error) {
    logger.error(
      'Validate reset token error',
      'GET /api/auth/validate-reset-token',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.AUTH.INVALID_RESET_TOKEN,
      status: 500,
    });
  }
}
