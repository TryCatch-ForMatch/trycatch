import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { MESSAGES, buildResponse } from '@/constants/messages';

export async function POST(request: NextRequest) {
  try {
    const { email, inviteCode } = await request.json();

    const invite = await prisma.invite.findFirst({
      where: { email, code: inviteCode, used: false },
    });

    if (!invite) {
      return buildResponse({
        success: false,
        message: MESSAGES.REGISTER.INVALID,
        status: 403,
      });
    }
    return buildResponse({
      success: true,
      message: MESSAGES.INVITE.VALID,
      status: 200,
    });
  } catch (error) {
    console.error('Erro de validação:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.REGISTER.VALIDATION_ERROR,
      status: 500,
    });
  }
}
