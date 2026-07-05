import { ProjectStatus } from '@prisma/client';

import { MESSAGES, buildResponse } from '@/constants/messages';
import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { ROLE_GROUPS } from '@/lib/roles';

export async function GET() {
  const auth = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });

  if (!auth.authorized || !auth.session) return auth.response;

  try {
    const [projects, skills, feedbacks] = await Promise.all([
      prisma.project.findMany({
        where: {
          OR: [
            {
              ownerId: auth.session.user.id,
            },
            {
              stacksTaken: {
                some: {
                  userId: auth.session.user.id,
                },
              },
            },
          ],
        },
        select: {
          status: true,
        },
      }),
      prisma.userSkill.count({
        where: {
          userId: auth.session.user.id,
        },
      }),
      prisma.feedback.count({
        where: {
          toUserId: auth.session.user.id,
        },
      }),
    ]);

    const projectCounts = projects.reduce(
      (acc, project) => {
        if (project.status === ProjectStatus.EM_ANDAMENTO) {
          acc.projectsInProgress += 1;
        }

        if (project.status === ProjectStatus.CONCLUIDO) {
          acc.projectsCompleted += 1;
        }

        return acc;
      },
      {
        projectsInProgress: 0,
        projectsCompleted: 0,
      }
    );

    return buildResponse({
      success: true,
      message: MESSAGES.GENERAL.SUCCESS,
      data: {
        ...projectCounts,
        skills,
        feedbacks,
      },
      status: 200,
    });
  } catch (error) {
    logger.error(
      'Erro ao buscar resumo do dashboard:',
      'GET /api/dashboard/summary',
      {
        error: error instanceof Error ? error.message : String(error),
      }
    );

    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}
