/**
 * @jest-environment node
 */

import { ProjectStatus } from '@prisma/client';

import { GET } from '@/app/api/dashboard/projects/route';
import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { ROLE_GROUPS } from '@/lib/roles';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    project: {
      findMany: jest.fn(),
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

describe('GET /api/dashboard/projects', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar projetos em andamento e concluídos vinculados ao usuário autenticado', async () => {
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
      { status: ProjectStatus.EM_ANDAMENTO },
      { status: ProjectStatus.CONCLUIDO },
      { status: ProjectStatus.BUSCANDO },
    ]);

    const response = (await GET()) as Response;
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      projectsInProgress: 2,
      projectsCompleted: 1,
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
  });

  it('deve retornar 500 quando ocorrer erro ao buscar projetos', async () => {
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

    const response = (await GET()) as Response;
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);

    expect(logger.error).toHaveBeenCalledWith(
      'Erro ao buscar quantidade de projetos do dashboard:',
      'GET /api/dashboard/projects',
      {
        error: 'Database error',
      }
    );
  });
});
