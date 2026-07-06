/**
 * @jest-environment node
 */

import { GET, PATCH } from '@/app/api/team-project/user/route';
import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    project: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    stackTaken: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

jest.mock('@/lib/check-project-status', () => ({
  checkProjectStatus: jest.fn(),
}));

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

const authorizeUser = () => {
  (checkAuth as jest.Mock).mockResolvedValue({
    authorized: true,
    session: {
      user: { id: 'user-1', role: 'USER' },
    },
  });
};

describe('GET /api/team-project/user', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeUser();
  });

  it('deve registrar erro estruturado quando a busca falhar', async () => {
    (prisma.project.findMany as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
    expect(logger.error).toHaveBeenCalledWith(
      'Erro ao buscar projetos do usuário',
      'GET /api/team-project/user',
      { error: 'Database error' }
    );
  });
});

describe('PATCH /api/team-project/user', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeUser();
  });

  it('deve registrar erro estruturado quando atualização falhar', async () => {
    const projectId = '1234567890123456789012345';

    (prisma.project.findUnique as jest.Mock).mockResolvedValue({
      id: projectId,
      ownerId: 'user-1',
    });
    (prisma.project.update as jest.Mock).mockRejectedValue(
      new Error('Update failed')
    );

    const request = {
      json: async () => ({
        id: projectId,
        status: 'CONCLUIDO',
      }),
    } as unknown as NextRequest;

    const response = await PATCH(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
    expect(logger.error).toHaveBeenCalledWith(
      'Erro ao alterar status do projeto',
      'PATCH /api/team-project/user',
      { error: 'Update failed' }
    );
  });
});
