import { MESSAGES, buildResponse } from '@/constants/messages';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const count = await prisma.stack.count();

    return NextResponse.json({ count });
  } catch (error) {
    logger.error(
      'Erro ao buscar número de stacks:',
      'GET /api/tech-stack/count',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.TECH_STACK.INTERNAL_ERROR,
      status: 500,
      errors: { error: 'Erro ao buscar número de stacks' },
    });
  }
}
