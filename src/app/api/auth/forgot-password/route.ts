import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { z } from 'zod';
import crypto from 'crypto';
import { sendResetPasswordEmail } from '@/lib/mail/send-reset-password-email';
import { logger } from '@/lib/logger';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = forgotPasswordSchema.safeParse(body);

    if (!parseResult.success) {
      return buildResponse({
        success: false,
        message: MESSAGES.GENERAL.INVALID_DATA,
        errors: parseResult.error.flatten().fieldErrors,
        status: 400,
      });
    }

    const { email } = parseResult.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return buildResponse({
        success: true,
        message: MESSAGES.AUTH.FORGOT_PASSWORD_EMAIL_SENT,
        status: 200,
      });
    }

    // Gera token aleatório
    const token = crypto.randomBytes(32).toString('hex');

    // Hash do token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Expiração do token 1 hora
    const tokenExpiration = new Date(Date.now() + 1000 * 60 * 60);

    // Salva no banco de dados
    await prisma.passwordResetToken.create({
      data: {
        email: user.email,
        token: hashedToken,
        expiresAt: tokenExpiration,
      },
    });

    await sendResetPasswordEmail({
      email: user.email,
      name: user.name,
      token,
      expiresInMinutes: 30,
    });

    return buildResponse({
      success: true,
      message: MESSAGES.AUTH.FORGOT_PASSWORD_EMAIL_SENT,
      status: 200,
    });
  } catch (error) {
    logger.error('Forgot password error', 'POST /api/auth/forgot-password', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.AUTH.FORGOT_PASSWORD_ERROR,
      status: 500,
    });
  }
}
