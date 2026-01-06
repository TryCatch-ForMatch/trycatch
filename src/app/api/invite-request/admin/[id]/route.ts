import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';
import { MESSAGES, buildResponse } from '@/constants/messages';

const idSchema = z.string().min(1, 'ID inválido');

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized, session, response } = await checkAuth({
    allowedRoles: ['ADMIN'],
  });

  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(params.id);

  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
    });
  }

  const inviteRequestId = idParse.data;

  try {
    const existingRequest = await prisma.inviteRequest.findUnique({
      where: {
        id: inviteRequestId,
      },
    });

    await prisma.inviteRequest.delete({
      where: {
        id: inviteRequestId,
      },
    });

    if (!existingRequest) {
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
