import { prisma } from '@/lib/prisma';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';

export async function GET() {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const inviteRequests = await prisma.inviteRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return buildResponse({
      success: true,
      message: MESSAGES.INVITE_REQUEST.LIST_SUCCESS,
      data: inviteRequests,
      status: 200,
    });
  } catch (error) {
    logger.error(
      'Erro ao buscar solicitações de convite:',
      'GET /api/invite-request/admin',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.INVITE_REQUEST.GENERAL_ERROR,
      status: 500,
    });
  }
}
