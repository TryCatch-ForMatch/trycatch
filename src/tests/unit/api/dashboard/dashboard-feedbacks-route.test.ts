/**
 * @jest-environment node
 */

import { GET } from '@/app/api/dashboard/feedbacks/route';
import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { ROLE_GROUPS } from '@/lib/roles';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    feedback: {
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

describe('GET /api/dashboard/feedbacks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar a quantidade de feedbacks recebidos pelo usuário autenticado', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: true,
      session: {
        user: {
          id: 'user-1',
          role: 'USER',
        },
      },
    });

    (prisma.feedback.count as jest.Mock).mockResolvedValue(5);

    const response = (await GET()) as Response;
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      feedbacks: 5,
    });

    expect(checkAuth).toHaveBeenCalledWith({
      allowedRoles: ROLE_GROUPS.ALL,
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
    expect(prisma.feedback.count).not.toHaveBeenCalled();
  });

  it('deve retornar 500 quando ocorrer erro ao contar feedbacks', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: true,
      session: {
        user: {
          id: 'user-1',
          role: 'USER',
        },
      },
    });

    (prisma.feedback.count as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = (await GET()) as Response;
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);

    expect(logger.error).toHaveBeenCalledWith(
      'Erro ao buscar quantidade de feedbacks do dashboard:',
      'GET /api/dashboard/feedbacks',
      {
        error: 'Database error',
      }
    );
  });
});
