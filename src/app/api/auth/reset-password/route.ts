import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { buildResponse, MESSAGES } from '@/constants/messages';
import { logger } from '@/lib/logger';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = resetPasswordSchema.safeParse(body);

    if (!parseResult.success) {
      return buildResponse({
        success: false,
        message: MESSAGES.GENERAL.INVALID_DATA,
        errors: parseResult.error.flatten().fieldErrors,
        status: 400,
      });
    }

    const { token, password } = parseResult.data;

    // Hash do token recebido
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Busca token no banco de dados
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: hashedToken,
      },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.INVALID_RESET_TOKEN,
        status: 400,
      });
    }

    // Busca usuário pelo e-mail salvo no token
    const user = await prisma.user.findUnique({
      where: {
        email: resetToken.email,
      },
    });

    if (!user) {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.INVALID_RESET_TOKEN,
        status: 400,
      });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Atualiza senha e remove token usado
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      }),
    ]);

    return buildResponse({
      success: true,
      message: MESSAGES.AUTH.PASSWORD_RESET_SUCCESS,
      status: 200,
    });
  } catch (error) {
    logger.error('Reset password error', 'POST /api/auth/reset-password', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.AUTH.PASSWORD_RESET_ERROR,
      status: 500,
    });
  }
}
