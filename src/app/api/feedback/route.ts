import { NextResponse, NextRequest } from 'next/server';
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

export async function POST(request: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error('Erro ao fazer parse do body:', error);
    return NextResponse.json(
      { error: 'Body inválido. Envie um JSON válido.' },
      { status: 400 }
    );
  }

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
    // Verificar se o projeto existe
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado.' },
        { status: 404 }
      );
    }

    // Verificar se o usuário avaliador participou do projeto
    const fromUserParticipation = await prisma.stackTaken.findFirst({
      where: {
        projectId,
        userId: fromUserId,
      },
    });
    if (!fromUserParticipation) {
      return NextResponse.json(
        { error: 'Você não participou deste projeto.' },
        { status: 400 }
      );
    }

    // Verificar se o usuário a ser avaliado participou do projeto
    const toUserParticipation = await prisma.stackTaken.findFirst({
      where: {
        projectId,
        userId: toUserId,
      },
    });
    if (!toUserParticipation) {
      return NextResponse.json(
        { error: 'Usuário avaliado não participou deste projeto.' },
        { status: 400 }
      );
    }

    // Verificar se já existe um feedback desse fromUserId para esse toUserId neste projeto
    const existingFeedback = await prisma.feedback.findFirst({
      where: {
        projectId,
        fromUserId,
        toUserId,
      },
    });
    if (existingFeedback) {
      return NextResponse.json(
        { error: 'Você já avaliou este usuário neste projeto.' },
        { status: 400 }
      );
    }

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

export async function GET(request: NextRequest) {
  const { authorized, response } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized) return response;

  let searchParams: URLSearchParams;
  try {
    const url = new URL(request.url);
    searchParams = url.searchParams;
  } catch (error) {
    console.error('Erro ao ler os parâmetros da URL:', error);
    return NextResponse.json({ error: 'URL inválida' }, { status: 400 });
  }

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
