import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MESSAGES, buildResponse } from '@/constants/messages';

export async function GET() {
  try {
    const count = await prisma.invite.count({
      where: {
        used: false,
      },
    });
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Erro ao buscar número de convites:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.INVITE.INTERNAL_ERROR,
      errors: error,
      status: 500,
    });
  }
}
