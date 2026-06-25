import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { checkAuth } from '@/lib/check-auth';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { z } from 'zod';
import { ROLES, Role } from '@/lib/roles';
import { logger } from '@/lib/logger';

const inviteSchema = z.object({
  email: z.email(),
  role: z.enum(Object.values(ROLES) as [Role, ...Role[]]),
});

export async function GET() {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const invites = await prisma.invite.findMany({
      orderBy: { email: 'asc' },
    });
    return NextResponse.json(invites, { status: 200 });
  } catch (error) {
    logger.error('Erro ao buscar convites:', 'GET /api/invite', {
      error: error instanceof Error ? error.message : String(error),
    });
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
    body = inviteSchema.parse(body);
  } catch (error) {
    logger.error('Erro ao validar dados do convite:', 'POST /api/invite', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
    });
  }

  const { email, role } = body;

  try {
    const existing = await prisma.invite.findFirst({ where: { email } });
    const userExisting = await prisma.user.findFirst({ where: { email } });

    if (existing || userExisting) {
      return buildResponse({
        success: false,
        message: MESSAGES.INVITE.ALREADY_EXISTS,
        status: 409,
      });
    }
    const code = crypto.randomBytes(8).toString('hex');

    const invite = await prisma.invite.create({
      data: { email, code, role },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.INVITE.VALID,
      data: { email: invite.email, code: invite.code, role: invite.role },
      status: 201,
    });
  } catch (error) {
    logger.error('Erro ao criar convite:', 'POST /api/invite', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.INVITE.INTERNAL_ERROR,
      status: 500,
    });
  }
}
