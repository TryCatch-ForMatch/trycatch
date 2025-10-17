import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MESSAGES, buildResponse } from '@/constants/messages';

export async function GET() {
  try {
    // Busca todos os usuários ativos com suas skills e feedbacks recebidos
    const users = await prisma.user.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        github: true,
        linkedin: true,
        bio: true,
        skills: {
          select: {
            skill: {
              select: {
                name: true,
              },
            },
          },
        },
        feedbacksReceived: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    // Mapeia os dados para o formato esperado no frontend
    const summary = users.map((user) => {
      const averageFeedback =
        user.feedbacksReceived.length > 0
          ? user.feedbacksReceived.reduce(
              (currentTotal, feedback) => currentTotal + feedback.rating,
              0
            ) / user.feedbacksReceived.length
          : null;

      return {
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        github: user.github,
        linkedin: user.linkedin,
        bio: user.bio,
        feedback: averageFeedback, // média (ou null se não tiver)
        skills: user.skills.map((us) => us.skill.name),
      };
    });

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error('❌ Erro ao buscar portfólios:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      errors: error instanceof Error ? error.message : 'Erro desconhecido',
      status: 500,
    });
  }
}
