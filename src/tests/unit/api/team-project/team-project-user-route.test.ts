/**
 * @jest-environment node
 */

import { GET, PATCH } from '@/app/api/team-project/user/route';
import { MESSAGES } from '@/constants/messages';
import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';
import { checkProjectStatus } from '@/lib/check-project-status';
import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    $transaction: jest.fn(),
    project: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    projectStack: {
      count: jest.fn(),
    },
    stackTaken: {
      count: jest.fn(),
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

const projectId = 'project-123456789012345678';
const ownerId = 'owner-1';

const createRequest = (body: unknown) =>
  ({
    json: async () => body,
  }) as NextRequest;

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

const authorizeUser = (id = ownerId, role = 'USER') => {
  (checkAuth as jest.Mock).mockResolvedValue({
    authorized: true,
    session: {
      user: { id, role },
    },
  });
};

const mockProject = (overrides = {}) => ({
  id: projectId,
  ownerId,
  status: ProjectStatus.EM_ANDAMENTO,
  ...overrides,
});

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

    (prisma.project.findUnique as jest.Mock).mockResolvedValue(mockProject());
    (prisma.projectStack as any).count.mockResolvedValue(2);
    (prisma.stackTaken.count as jest.Mock).mockResolvedValue(2);

    (prisma.project.update as jest.Mock).mockResolvedValue(
      mockProject({ status: ProjectStatus.CONCLUIDO })
    );

    (prisma.$transaction as jest.Mock).mockImplementation(async (callback) =>
      callback(prisma)
    );

    (checkProjectStatus as jest.Mock).mockResolvedValue(null);
  });

  it('conclui projeto quando owner, status e stacks são elegíveis', async () => {
    const response = await PATCH(
      createRequest({
        id: projectId,
        status: ProjectStatus.CONCLUIDO,
      })
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe(ProjectStatus.CONCLUIDO);

    expect(prisma.$transaction).toHaveBeenCalledWith(expect.any(Function));

    expect(prisma.project.update).toHaveBeenCalledWith({
      where: { id: projectId },
      data: { status: ProjectStatus.CONCLUIDO },
    });

    expect(checkProjectStatus).toHaveBeenCalledWith(projectId);
  });

  it('bloqueia conclusão quando usuário não é owner', async () => {
    authorizeUser('user-2');

    const response = await PATCH(
      createRequest({
        id: projectId,
        status: ProjectStatus.CONCLUIDO,
      })
    );

    const body = await response.json();

    expect(response.status).toBe(403);

    expect(body).toMatchObject({
      success: false,
      message: MESSAGES.AUTH.UNAUTHORIZED,
    });

    expect(prisma.project.update).not.toHaveBeenCalled();
  });

  it('bloqueia status diferente de CONCLUIDO', async () => {
    const response = await PATCH(
      createRequest({
        id: projectId,
        status: ProjectStatus.BUSCANDO,
      })
    );

    const body = await response.json();

    expect(response.status).toBe(400);

    expect(body).toMatchObject({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
    });

    expect(prisma.project.update).not.toHaveBeenCalled();
  });

  it('bloqueia conclusão quando projeto não está EM_ANDAMENTO', async () => {
    (prisma.project.findUnique as jest.Mock).mockResolvedValue(
      mockProject({
        status: ProjectStatus.BUSCANDO,
      })
    );

    const response = await PATCH(
      createRequest({
        id: projectId,
        status: ProjectStatus.CONCLUIDO,
      })
    );

    const body = await response.json();

    expect(response.status).toBe(400);

    expect(body.errors).toContain(
      'Projeto só pode ser concluído em status EM_ANDAMENTO.'
    );

    expect(prisma.project.update).not.toHaveBeenCalled();
  });

  it('bloqueia conclusão quando existem stacks não assumidas', async () => {
    (prisma.projectStack.count as jest.Mock).mockResolvedValue(3);
    (prisma.stackTaken.count as jest.Mock).mockResolvedValue(2);

    const response = await PATCH(
      createRequest({
        id: projectId,
        status: ProjectStatus.CONCLUIDO,
      })
    );

    const body = await response.json();

    expect(response.status).toBe(400);

    expect(body.errors).toContain(
      'Todas as stacks devem estar assumidas para concluir.'
    );

    expect(prisma.project.update).not.toHaveBeenCalled();
  });

  it('deve registrar erro estruturado quando atualização falhar', async () => {
    (prisma.project.update as jest.Mock).mockRejectedValue(
      new Error('Update failed')
    );

    const response = await PATCH(
      createRequest({
        id: projectId,
        status: ProjectStatus.CONCLUIDO,
      })
    );

    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);

    expect(logger.error).toHaveBeenCalledWith(
      'Erro ao alterar status do projeto',
      'PATCH /api/team-project/user',
      {
        error: 'Update failed',
      }
    );
  });
});
