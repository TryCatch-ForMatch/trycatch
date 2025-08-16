import { MESSAGES, buildResponse } from '@/constants/messages';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const count = await prisma.project.count();

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Erro ao buscar número de projetos:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}
