import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MESSAGES, buildResponse } from '@/constants/messages';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { isActive: true, portfolioPublic: true },
      select: {
        id: true,
        name: true,
        avatar: true,
        role: true,
        github: true,
        linkedin: true,
        bio: true,
        showGithub: true,
        showLinkedin: true,
        showFeedback: true,
        skills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
                iconUrl: true,
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
        id: user.id,
        avatar: user.avatar,
        name: user.name,
        role: user.role,
        bio: user.bio,
        github: user.showGithub ? user.github : null,
        linkedin: user.showLinkedin ? user.linkedin : null,
        feedback: user.showFeedback ? averageFeedback : null,
        skills: user.skills.map((us) => ({
          id: us.skill.id,
          name: us.skill.name,
          iconUrl: us.skill.iconUrl,
        })),
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
