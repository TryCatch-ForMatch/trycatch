import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';

const feedbackSchema = z.object({
  projectId: z.string(),
  toUserId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  anonymous: z.boolean(),
  stackTakenId: z.string().optional(),
});

export async function POST(req: Request) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const body = await req.json();
  const parsed = feedbackSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { projectId, toUserId, rating, comment, anonymous, stackTakenId } =
    parsed.data;
  const fromUserId = session.user.id;

  if (fromUserId === toUserId) {
    return NextResponse.json(
      { error: 'Você não pode avaliar a si mesmo.' },
      { status: 400 }
    );
  }

  try {
    const feedback = await prisma.feedback.create({
      data: {
        projectId,
        fromUserId,
        toUserId,
        rating,
        comment,
        anonymous,
        stackTakenId,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar feedback:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar feedback' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { authorized, response } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized) return response;

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  if (!projectId) {
    return NextResponse.json(
      { error: 'Parâmetro projectId é obrigatório' },
      { status: 400 }
    );
  }

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: { projectId },
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

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Erro ao buscar feedbacks:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar feedbacks' },
      { status: 500 }
    );
  }
}
