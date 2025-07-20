import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';

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
    return NextResponse.json(
      { error: 'Usuário não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
