/**
 * @jest-environment node
 */

import { PUT } from '@/app/api/team-project/[id]/route';
import { MESSAGES } from '@/constants/messages';
import { checkAuth } from '@/lib/check-auth';
import { checkProjectStatus } from '@/lib/check-project-status';
import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    project: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    projectStack: {
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    stackTaken: {
      deleteMany: jest.fn(),
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

const projectId = 'project-123456789012345678';
const ownerId = 'owner-1';

const validPayload = {
  name: 'Projeto TryCatch',
  description: 'Descrição atualizada do projeto.',
  deadline: '2026-12-31T23:59:59.000Z',
  totalValue: 10000,
  status: ProjectStatus.EM_ANDAMENTO,
  skills: ['skill-1', 'skill-2'],
  github: 'https://github.com/TryCatch-ForMatch/trycatch',
  stacks: [
    { stackId: 'stack-1', percentage: 60 },
    { stackId: 'stack-2', percentage: 40 },
  ],
};

const existingProject = (overrides = {}) => ({
  id: projectId,
  ownerId,
  name: validPayload.name,
  description: 'Descrição original do projeto.',
  deadline: new Date(validPayload.deadline),
  totalValue: validPayload.totalValue,
  status: ProjectStatus.EM_ANDAMENTO,
  skills: [{ skillId: 'skill-1' }, { skillId: 'skill-2' }],
  stacks: [
    { stackId: 'stack-1', percentage: 60 },
    { stackId: 'stack-2', percentage: 40 },
  ],
  stacksTaken: [],
  ...overrides,
});

const createRequest = (body: unknown) =>
  ({
    json: async () => body,
  }) as NextRequest;

const createContext = () => ({
  params: { id: projectId },
});

const authorizeOwner = () => {
  (checkAuth as jest.Mock).mockResolvedValue({
    authorized: true,
    session: {
      user: { id: ownerId, role: 'USER' },
    },
  });
};

describe('PUT /api/team-project/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeOwner();
    (prisma.project.findUnique as jest.Mock).mockResolvedValue(
      existingProject()
    );
    (prisma.projectStack.findMany as jest.Mock).mockResolvedValue([
      { id: 'project-stack-1', stackId: 'stack-1', percentage: 60 },
      { id: 'project-stack-2', stackId: 'stack-2', percentage: 40 },
    ]);
    (prisma.project.update as jest.Mock).mockResolvedValue({
      id: projectId,
      ...validPayload,
    });
    (checkProjectStatus as jest.Mock).mockResolvedValue(null);
  });

  it('permite atualizar descrição quando existe StackTaken sem mudança estrutural', async () => {
    (prisma.project.findUnique as jest.Mock).mockResolvedValue(
      existingProject({
        stacksTaken: [{ id: 'stack-taken-1' }],
      })
    );

    const response = await PUT(createRequest(validPayload), createContext());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.id).toBe(projectId);
    expect(prisma.project.update).toHaveBeenCalledWith({
      where: { id: projectId },
      data: {
        name: validPayload.name,
        description: validPayload.description,
        deadline: new Date(validPayload.deadline),
        totalValue: validPayload.totalValue,
        status: validPayload.status,
        github: validPayload.github,
        skills: {
          deleteMany: {},
          create: validPayload.skills.map((skillId) => ({
            skill: { connect: { id: skillId } },
          })),
        },
      },
    });
  });

  it('bloqueia alteração de name após formação da equipe', async () => {
    (prisma.project.findUnique as jest.Mock).mockResolvedValue(
      existingProject({
        stacksTaken: [{ id: 'stack-taken-1' }],
      })
    );

    const response = await PUT(
      createRequest({ ...validPayload, name: 'Novo nome' }),
      createContext()
    );
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body).toMatchObject({
      success: false,
      message: MESSAGES.AUTH.UNAUTHORIZED,
    });
    expect(body.errors).toContain(
      'Não é permitido alterar estrutura do projeto após formação da equipe.'
    );
    expect(prisma.project.update).not.toHaveBeenCalled();
  });

  it('bloqueia alteração de skills após formação da equipe', async () => {
    (prisma.project.findUnique as jest.Mock).mockResolvedValue(
      existingProject({
        stacksTaken: [{ id: 'stack-taken-1' }],
      })
    );

    const response = await PUT(
      createRequest({ ...validPayload, skills: ['skill-1', 'skill-3'] }),
      createContext()
    );

    expect(response.status).toBe(403);
    expect(prisma.project.update).not.toHaveBeenCalled();
  });

  it('bloqueia alteração de stacks após formação da equipe', async () => {
    (prisma.project.findUnique as jest.Mock).mockResolvedValue(
      existingProject({
        stacksTaken: [{ id: 'stack-taken-1' }],
      })
    );

    const response = await PUT(
      createRequest({
        ...validPayload,
        stacks: [
          { stackId: 'stack-1', percentage: 50 },
          { stackId: 'stack-2', percentage: 50 },
        ],
      }),
      createContext()
    );

    expect(response.status).toBe(403);
    expect(prisma.project.update).not.toHaveBeenCalled();
  });
});
