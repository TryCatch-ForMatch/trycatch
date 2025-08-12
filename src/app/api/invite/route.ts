import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { checkAuth } from '@/lib/check-auth';
import { MESSAGES, buildResponse } from '@/constants/messages';

export async function GET() {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const invites = await prisma.invite.findMany({
      orderBy: { email: 'asc' },
    });
    return NextResponse.json(invites, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar convites:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.INVITE.INTERNAL_ERROR,
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error('Erro ao fazer parse do JSON:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
    });
  }

  const { email } = body;

  if (!email) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
    });
  }

  try {
    const existing = await prisma.invite.findFirst({ where: { email } });

    if (existing) {
      return buildResponse({
        success: false,
        message: MESSAGES.INVITE.ALREADY_EXISTS,
        status: 409,
      });
    }
    const code = crypto.randomBytes(8).toString('hex');

    const invite = await prisma.invite.create({
      data: { email, code },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.INVITE.VALID,
      data: { email: invite.email, code: invite.code },
      status: 201,
    });
  } catch (error) {
    console.error('Erro ao criar convite:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.INVITE.INTERNAL_ERROR,
      status: 500,
    });
  }
}
