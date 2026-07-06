/**
 * @jest-environment node
 */

import { GET } from '@/app/api/dashboard/skills/route';
import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { ROLE_GROUPS } from '@/lib/roles';

jest.mock('@/lib/prisma', () => ({
  prisma: {
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

describe('GET /api/dashboard/skills', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar a quantidade de skills do usuário autenticado', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: true,
      session: {
        user: {
          id: 'user-1',
          role: 'USER',
        },
      },
    });

    (prisma.userSkill.count as jest.Mock).mockResolvedValue(3);

    const response = (await GET()) as Response;
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      skills: 3,
    });

    expect(checkAuth).toHaveBeenCalledWith({
      allowedRoles: ROLE_GROUPS.ALL,
    });

    expect(prisma.userSkill.count).toHaveBeenCalledWith({
      where: {
        userId: 'user-1',
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
    expect(prisma.userSkill.count).not.toHaveBeenCalled();
  });

  it('deve retornar 500 quando ocorrer erro ao contar skills', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: true,
      session: {
        user: {
          id: 'user-1',
          role: 'USER',
        },
      },
    });

    (prisma.userSkill.count as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = (await GET()) as Response;
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);

    expect(logger.error).toHaveBeenCalledWith(
      'Erro ao buscar quantidade de skills do dashboard:',
      'GET /api/dashboard/skills',
      {
        error: 'Database error',
      }
    );
  });
});
