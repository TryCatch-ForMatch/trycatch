import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildResponse, MESSAGES } from '@/constants/messages';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const count = await prisma.user.count();

    return NextResponse.json({ count });
  } catch (error) {
    logger.error('Erro ao buscar número de usuários:', 'GET /api/user/count', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao contar usuários'],
    });
  }
}
