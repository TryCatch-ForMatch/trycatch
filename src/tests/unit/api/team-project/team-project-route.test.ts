/**
 * @jest-environment node
 */

import { ProjectStatus } from '@prisma/client';
import { NextRequest } from 'next/server';

import { POST } from '@/app/api/team-project/route';
import { MESSAGES } from '@/constants/messages';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { ROLE_GROUPS } from '@/lib/roles';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    project: {
      create: jest.fn(),
    },
  },
}));

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

jest.mock('@/lib/check-project-status', () => ({
  checkProjectStatus: jest.fn(),
}));

const validPayload = {
  name: 'Projeto TryCatch',
  description: 'Projeto para validar regras do domínio Project.',
  deadline: '2026-12-31T23:59:59.000Z',
  totalValue: 10000,
  status: ProjectStatus.BUSCANDO,
  skills: ['skill-1', 'skill-2'],
  stacks: [
    {
      stackId: 'stack-1',
      percentage: 60,
    },
    {
      stackId: 'stack-2',
      percentage: 40,
    },
  ],
  github: 'https://github.com/TryCatch-ForMatch/trycatch',
};

function createRequest(payload: unknown) {
  return {
    json: async () => payload,
  } as unknown as NextRequest;
}

function authorizeUser() {
  (checkAuth as jest.Mock).mockResolvedValue({
    authorized: true,
    session: {
      user: {
        id: 'user-1',
        role: 'USER',
      },
    },
  });
}

describe('POST /api/team-project', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeUser();
  });

  it('deve criar projeto quando os dados forem válidos', async () => {
    const createdProject = {
      id: 'project-1',
      ownerId: 'user-1',
      name: validPayload.name,
      description: validPayload.description,
      deadline: new Date(validPayload.deadline),
      totalValue: validPayload.totalValue,
      status: validPayload.status,
      github: validPayload.github,
    };

    (prisma.project.create as jest.Mock).mockResolvedValue(createdProject);

    const response = (await POST(createRequest(validPayload))) as Response;
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toEqual({
      success: true,
      message: MESSAGES.PROJECT.CREATED,
      data: {
        ...createdProject,
        deadline: validPayload.deadline,
      },
      errors: null,
    });

    expect(checkAuth).toHaveBeenCalledWith({
      allowedRoles: ROLE_GROUPS.ALL,
    });
    expect(prisma.project.create).toHaveBeenCalledWith({
      data: {
        ownerId: 'user-1',
        name: validPayload.name,
        description: validPayload.description,
        deadline: new Date(validPayload.deadline),
        totalValue: validPayload.totalValue,
        status: validPayload.status,
        github: validPayload.github,
        skills: {
          create: [
            {
              skill: {
                connect: {
                  id: 'skill-1',
                },
              },
            },
            {
              skill: {
                connect: {
                  id: 'skill-2',
                },
              },
            },
          ],
        },
        stacks: {
          create: [
            {
              stack: {
                connect: {
                  id: 'stack-1',
                },
              },
              percentage: 60,
            },
            {
              stack: {
                connect: {
                  id: 'stack-2',
                },
              },
              percentage: 40,
            },
          ],
        },
      },
    });
  });

  it('deve converter github vazio para null ao criar projeto', async () => {
    const payload = {
      ...validPayload,
      github: '',
    };
    const createdProject = {
      id: 'project-1',
      ownerId: 'user-1',
      github: null,
    };

    (prisma.project.create as jest.Mock).mockResolvedValue(createdProject);

    const response = (await POST(createRequest(payload))) as Response;

    expect(response.status).toBe(201);
    expect(prisma.project.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          github: null,
        }),
      })
    );
  });

  it('deve bloquear criação com payload inválido', async () => {
    const response = (await POST(
      createRequest({
        ...validPayload,
        name: '',
        deadline: 'data-invalida',
      })
    )) as Response;
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.message).toBe(MESSAGES.GENERAL.INVALID_DATA);
    expect(body.errors.name._errors).toContain('O nome é obrigatório');
    expect(body.errors.deadline._errors).toContain('Data inválida');
    expect(prisma.project.create).not.toHaveBeenCalled();
  });

  it('deve bloquear stack com percentual fora do intervalo permitido', async () => {
    const response = (await POST(
      createRequest({
        ...validPayload,
        stacks: [
          {
            stackId: 'stack-1',
            percentage: 101,
          },
        ],
      })
    )) as Response;
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.message).toBe(MESSAGES.GENERAL.INVALID_DATA);
    expect(body.errors.stacks[0].percentage._errors).toContain(
      'Too big: expected number to be <=100'
    );
    expect(prisma.project.create).not.toHaveBeenCalled();
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

    const response = (await POST(createRequest(validPayload))) as Response;

    expect(response.status).toBe(401);
    expect(prisma.project.create).not.toHaveBeenCalled();
  });
});
