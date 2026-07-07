import { ProjectStatus } from '@prisma/client';
import { NextResponse } from 'next/server';

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
    const projects = await prisma.project.findMany({
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
    });

    const counts = projects.reduce(
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

    return NextResponse.json(counts, { status: 200 });
  } catch (error) {
    logger.error(
      'Erro ao buscar quantidade de projetos do dashboard:',
      'GET /api/dashboard/projects',
      {
        error: error instanceof Error ? error.message : String(error),
      }
    );

    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}
