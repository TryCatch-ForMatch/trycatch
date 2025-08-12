import { MESSAGES, buildResponse } from '@/constants/messages';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.skill.count();
    return buildResponse({
      success: true,
      message: MESSAGES.SKILL.FETCH_SUCCESS,
      data: { count },
    });
  } catch (error) {
    console.error('Erro ao buscar número de skills:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.SKILL.INTERNAL_ERROR,
      status: 500,
      errors: error,
    });
  }
}
