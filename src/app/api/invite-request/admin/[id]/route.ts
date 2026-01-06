import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { getIdFromRequest } from '@/utils/url';

const idSchema = z.string().min(1, 'ID inválido');

export async function DELETE(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  const id = getIdFromRequest(request);
  const idParse = idSchema.safeParse(id);

  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
    });
  }

  try {
    const existing = await prisma.inviteRequest.findUnique({
      where: { id: idParse.data },
    });

    if (!existing) {
      return buildResponse({
        success: false,
        message: MESSAGES.INVITE_REQUEST.NOT_FOUND,
        status: 404,
      });
    }

    await prisma.inviteRequest.delete({
      where: { id: idParse.data },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.INVITE_REQUEST.DELETED,
      status: 200,
    });
  } catch {
    return buildResponse({
      success: false,
      message: MESSAGES.INVITE_REQUEST.GENERAL_ERROR,
      status: 500,
    });
  }
}
