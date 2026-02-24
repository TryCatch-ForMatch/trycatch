import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { buildPublicPortfolio } from '@/lib/portfolio/portfolio-visibility';
import { logger } from '@/lib/logger';

type RouteContext = {
  params: Promise<{ username: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { username } = await context.params;

  logger.info(
    'Public portfolio request received',
    'GET /api/portfolio/[username]',
    { username }
  );

  try {
    const portfolio = await prisma.user.findUnique({
      where: {
        userName: username,
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
        isActive: true,
        showEmail: true,
        showGithub: true,
        showLinkedin: true,
        showCertificates: true,
        showProjects: true,
        showFeedback: true,
        portfolioPublic: true,

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
          where: {
            project: {
              status: ProjectStatus.CONCLUIDO,
            },
          },
          include: {
            stack: true,
            project: {
              select: {
                id: true,
                name: true,
                description: true,
                status: true,
                skills: {
                  select: {
                    skill: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!portfolio) {
      logger.warn('Portfolio not found', 'GET /api/portfolio/[username]', {
        username,
      });

      return buildResponse({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
        status: 404,
      });
    }

    if (!portfolio.isActive) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
        status: 404,
      });
    }

    if (!portfolio.portfolioPublic) {
      logger.warn(
        'Attempt to access private portfolio',
        'GET /api/portfolio/[username]',
        { username }
      );

      return buildResponse({
        success: false,
        message: MESSAGES.PORTFOLIO.NOT_FOUND,
        status: 404,
      });
    }

    const publicPortfolio = buildPublicPortfolio(portfolio);

    return NextResponse.json(publicPortfolio, { status: 200 });
  } catch (error) {
    logger.error(
      'Unexpected error while fetching public portfolio',
      'GET /api/portfolio/[username]',
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error
    );

    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      errors: error instanceof Error ? error.message : 'Erro desconhecido',
      status: 500,
    });
  }
}
