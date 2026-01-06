import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { checkAuth } from '@/lib/check-auth';

export async function GET(request: NextRequest) {
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
    console.error('Erro ao buscar solicitações de convite:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.INVITE_REQUEST.GENERAL_ERROR,
      status: 500,
    });
  }
}
