import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { MESSAGES, buildResponse } from '@/constants/messages';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = params;

  try {
    const portfolio = await prisma.user.findFirst({
      where: {
        id,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        role: true,
        avatar: true,
        bio: true,
        github: true,
        linkedin: true,
        email: true,
        emailVisible: true,

        skills: {
          include: {
            skill: true,
          },
        },

        certificates: true,

        feedbacksReceived: {
          include: {
            fromUser: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
        },

        stacksTaken: {
          include: {
            stack: true,
            project: {
              select: {
                id: true,
                name: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!portfolio) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
        status: 404,
      });
    }

    const publicPortfolio = {
      ...portfolio,
      email: portfolio.emailVisible ? portfolio.email : null,
    };

    return NextResponse.json(publicPortfolio, { status: 200 });
  } catch (error) {
    console.error('❌ Erro ao buscar portfólio público:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      errors: error instanceof Error ? error.message : 'Erro desconhecido',
      status: 500,
    });
  }
}
