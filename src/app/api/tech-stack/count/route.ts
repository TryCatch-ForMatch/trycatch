import { MESSAGES, buildResponse } from '@/constants/messages';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.stack.count();
    return buildResponse({
      success: true,
      message: MESSAGES.TECH_STACK.FETCH_SUCCESS,
      data: { count },
      status: 200,
    });
  } catch (error) {
    console.error('Erro ao buscar número de stacks:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.TECH_STACK.INTERNAL_ERROR,
      status: 500,
      errors: { error: 'Erro ao buscar número de stacks' },
    });
  }
}
