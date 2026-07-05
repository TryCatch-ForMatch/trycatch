/**
 * @jest-environment node
 */

import { checkProjectStatus } from '@/lib/check-project-status';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    stackTaken: {
      findFirst: jest.fn(),
      count: jest.fn(),
    },
    project: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    projectStack: {
      count: jest.fn(),
    },
  },
}));

jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe('checkProjectStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve registrar aviso quando o projeto não existir', async () => {
    (prisma.stackTaken.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.project.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await checkProjectStatus('project-1');
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.success).toBe(false);
    expect(logger.warn).toHaveBeenCalledWith(
      'Nenhum registro encontrado na tabela StackTaken',
      'checkProjectStatus',
      { projectId: 'project-1' }
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'Projeto não encontrado',
      'checkProjectStatus',
      { projectId: 'project-1' }
    );
  });

  it('deve manter projeto concluído sem atualizar status', async () => {
    (prisma.stackTaken.findFirst as jest.Mock).mockResolvedValue({
      id: 'taken-1',
    });
    (prisma.project.findUnique as jest.Mock).mockResolvedValue({
      status: ProjectStatus.CONCLUIDO,
    });

    const response = await checkProjectStatus('project-2');
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toEqual({ status: ProjectStatus.CONCLUIDO });
    expect(prisma.project.update).not.toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith(
      'Projeto já está concluído sem alterações',
      'checkProjectStatus',
      {
        projectId: 'project-2',
        status: ProjectStatus.CONCLUIDO,
      }
    );
  });

  it('deve registrar atualização quando o status mudar', async () => {
    (prisma.stackTaken.findFirst as jest.Mock).mockResolvedValue({
      id: 'taken-1',
    });
    (prisma.project.findUnique as jest.Mock).mockResolvedValue({
      status: ProjectStatus.BUSCANDO,
    });
    (prisma.projectStack.count as jest.Mock).mockResolvedValue(2);
    (prisma.stackTaken.count as jest.Mock).mockResolvedValue(2);

    const result = await checkProjectStatus('project-3');

    expect(result).toEqual({
      totalProjectStack: 2,
      totalStackTaken: 2,
      newStatus: ProjectStatus.EM_ANDAMENTO,
    });
    expect(prisma.project.update).toHaveBeenCalledWith({
      where: { id: 'project-3' },
      data: { status: ProjectStatus.EM_ANDAMENTO },
    });
    expect(logger.info).toHaveBeenCalledWith(
      'Contagem de stacks do projeto calculada',
      'checkProjectStatus',
      {
        projectId: 'project-3',
        totalProjectStack: 2,
        totalStackTaken: 2,
      }
    );
    expect(logger.info).toHaveBeenCalledWith(
      'Status do projeto atualizado',
      'checkProjectStatus',
      {
        projectId: 'project-3',
        previousStatus: ProjectStatus.BUSCANDO,
        newStatus: ProjectStatus.EM_ANDAMENTO,
      }
    );
  });

  it('deve registrar manutenção quando o status não mudar', async () => {
    (prisma.stackTaken.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.project.findUnique as jest.Mock).mockResolvedValue({
      status: ProjectStatus.BUSCANDO,
    });
    (prisma.projectStack.count as jest.Mock).mockResolvedValue(3);
    (prisma.stackTaken.count as jest.Mock).mockResolvedValue(1);

    const result = await checkProjectStatus('project-4');

    expect(result).toEqual({
      totalProjectStack: 3,
      totalStackTaken: 1,
      newStatus: ProjectStatus.BUSCANDO,
    });
    expect(prisma.project.update).not.toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith(
      'Status do projeto mantido',
      'checkProjectStatus',
      {
        projectId: 'project-4',
        status: ProjectStatus.BUSCANDO,
      }
    );
  });
});
