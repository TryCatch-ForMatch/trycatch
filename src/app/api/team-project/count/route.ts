import { MESSAGES, buildResponse } from '@/constants/messages';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.project.count();
    return buildResponse({
      success: true,
      message: MESSAGES.PROJECT.FETCH_SUCCESS,
      data: { count },
    });
  } catch (error) {
    console.error('Erro ao buscar número de projetos:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}
