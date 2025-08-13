import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildResponse, MESSAGES } from '@/constants/messages';

export async function GET() {
  try {
    const count = await prisma.user.count();

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Erro ao buscar número de usuários:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao buscar usuários'],
    });
  }
}
