import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkAuth } from '@/lib/check-auth';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { ROLE_GROUPS } from '@/lib/roles';

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
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error('Erro ao fazer parse do body:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
    });
  }

  const parsed = feedbackSchema.safeParse(body);
  if (!parsed.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: parsed.error.flatten().fieldErrors,
      status: 400,
    });
  }

  const { projectId, toUserId, rating, comment, anonymous, stackTakenId } =
    parsed.data;
  const fromUserId = session.user.id;

  if (fromUserId === toUserId) {
    return buildResponse({
      success: false,
      message: MESSAGES.FEEDBACK.SELF_FEEDBACK,
      status: 400,
    });
  }

  try {
    // Verificar se o projeto existe
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      return buildResponse({
        success: false,
        message: MESSAGES.PROJECT.NOT_FOUND,
        status: 404,
      });
    }

    // Verificar se o usuário avaliador participou do projeto
    const fromUserParticipation = await prisma.stackTaken.findFirst({
      where: {
        projectId,
        userId: fromUserId,
      },
    });
    if (!fromUserParticipation) {
      return buildResponse({
        success: false,
        message: MESSAGES.FEEDBACK.NO_PARTICIPATION,
        status: 400,
      });
    }

    // Verificar se o usuário a ser avaliado participou do projeto
    const toUserParticipation = await prisma.stackTaken.findFirst({
      where: {
        projectId,
        userId: toUserId,
      },
    });
    if (!toUserParticipation) {
      return buildResponse({
        success: false,
        message: MESSAGES.FEEDBACK.NO_PARTICIPATION,
        status: 400,
      });
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
      return buildResponse({
        success: false,
        message: MESSAGES.FEEDBACK.ALREADY_GIVEN,
        status: 400,
      });
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
    return buildResponse({
      success: false,
      message: MESSAGES.FEEDBACK.INTERNAL_ERROR,
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  const { authorized, response } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized) return response;

  let searchParams: URLSearchParams;
  try {
    const url = new URL(request.url);
    searchParams = url.searchParams;
  } catch (error) {
    console.error('Erro ao ler os parâmetros da URL:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      errors: { url: 'URL inválida' },
      status: 400,
    });
  }

  const projectId = searchParams.get('projectId');
  if (!projectId) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: { projectId: 'Parâmetro projectId é obrigatório.' },
      status: 400,
    });
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

    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar feedbacks:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.FEEDBACK.INTERNAL_ERROR,
      errors: process.env.NODE_ENV === 'development' ? error : undefined,
      status: 500,
    });
  }
}
