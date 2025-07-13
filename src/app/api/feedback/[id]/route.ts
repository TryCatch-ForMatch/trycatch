import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const feedbackId = params.id;

  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        fromUser: true,
        toUser: true,
        stackTaken: {
          include: {
            stack: true,
            project: true,
          },
        },
      },
    });

    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Erro ao buscar feedback:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
