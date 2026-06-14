import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const count = await prisma.invite.count({
      where: {
        used: false,
      },
    });
    return NextResponse.json({ count });
  } catch (error) {
    logger.error(
      'Erro ao buscar número de convites:',
      'GET /api/invite/count',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.INVITE.INTERNAL_ERROR,
      errors: error,
      status: 500,
    });
  }
}
