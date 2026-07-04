/**
 * @jest-environment node
 */

import { ProjectStatus } from '@prisma/client';

import { GET } from '@/app/api/dashboard/summary/route';
import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { ROLE_GROUPS } from '@/lib/roles';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    feedback: {
      count: jest.fn(),
    },
    project: {
      findMany: jest.fn(),
    },
    userSkill: {
      count: jest.fn(),
    },
  },
}));

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('GET /api/dashboard/summary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar resumo do dashboard para o usuário autenticado', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: true,
      session: {
        user: {
          id: 'user-1',
          role: 'USER',
        },
      },
    });

    (prisma.project.findMany as jest.Mock).mockResolvedValue([
      { status: ProjectStatus.EM_ANDAMENTO },
      { status: ProjectStatus.CONCLUIDO },
      { status: ProjectStatus.CONCLUIDO },
      { status: ProjectStatus.BUSCANDO },
    ]);
    (prisma.userSkill.count as jest.Mock).mockResolvedValue(4);
    (prisma.feedback.count as jest.Mock).mockResolvedValue(6);

    const response = (await GET()) as Response;
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      projectsInProgress: 1,
      projectsCompleted: 2,
      skills: 4,
      feedbacks: 6,
    });

    expect(checkAuth).toHaveBeenCalledWith({
      allowedRoles: ROLE_GROUPS.ALL,
    });

    expect(prisma.project.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          {
            ownerId: 'user-1',
          },
          {
            stacksTaken: {
              some: {
                userId: 'user-1',
              },
            },
          },
        ],
      },
      select: {
        status: true,
      },
    });

    expect(prisma.userSkill.count).toHaveBeenCalledWith({
      where: {
        userId: 'user-1',
      },
    });

    expect(prisma.feedback.count).toHaveBeenCalledWith({
      where: {
        toUserId: 'user-1',
      },
    });
  });

  it('deve bloquear usuário não autenticado', async () => {
    const authResponse = Response.json(
      { error: 'Não autenticado' },
      { status: 401 }
    );

    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: false,
      response: authResponse,
    });

    const response = (await GET()) as Response;

    expect(response.status).toBe(401);
    expect(prisma.project.findMany).not.toHaveBeenCalled();
    expect(prisma.userSkill.count).not.toHaveBeenCalled();
    expect(prisma.feedback.count).not.toHaveBeenCalled();
  });

  it('deve retornar 500 quando ocorrer erro ao buscar o resumo', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: true,
      session: {
        user: {
          id: 'user-1',
          role: 'USER',
        },
      },
    });

    (prisma.project.findMany as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );
    (prisma.userSkill.count as jest.Mock).mockResolvedValue(4);
    (prisma.feedback.count as jest.Mock).mockResolvedValue(6);

    const response = (await GET()) as Response;
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);

    expect(logger.error).toHaveBeenCalledWith(
      'Erro ao buscar resumo do dashboard:',
      'GET /api/dashboard/summary',
      {
        error: 'Database error',
      }
    );
  });
});
