import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { buildResponse, MESSAGES } from '@/constants/messages';

export async function GET() {
  const { authorized, session, response } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });

  if (!authorized || !session?.user?.id) {
    return response;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      skills: { include: { skill: true } },
    },
  });

  if (!user) {
    return buildResponse({
      success: false,
      message: MESSAGES.USER.NOT_FOUND,
      status: 404,
    });
  }

  return NextResponse.json(user);
}
