/**
 * @jest-environment node
 */

import { POST } from '@/app/api/feedback/route';
import { MESSAGES } from '@/constants/messages';
import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { ROLE_GROUPS } from '@/lib/roles';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    feedback: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
    project: {
      findUnique: jest.fn(),
    },
    stackTaken: {
      findFirst: jest.fn(),
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

const validPayload = {
  projectId: 'project-1',
  toUserId: 'user-2',
  rating: 5,
  comment: 'Ótima colaboração.',
  anonymous: false,
  stackTakenId: 'stack-taken-1',
};

function createRequest(payload: unknown) {
  return {
    json: async () => payload,
  } as unknown as NextRequest;
}

function authorizeUser(userId = 'user-1') {
  (checkAuth as jest.Mock).mockResolvedValue({
    authorized: true,
    session: {
      user: {
        id: userId,
        role: 'USER',
      },
    },
  });
}

describe('POST /api/feedback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeUser();
  });

  it('deve impedir autoavaliação', async () => {
    const response = (await POST(
      createRequest({
        ...validPayload,
        toUserId: 'user-1',
      })
    )) as Response;
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      message: MESSAGES.FEEDBACK.SELF_FEEDBACK,
      data: null,
      errors: null,
    });

    expect(checkAuth).toHaveBeenCalledWith({
      allowedRoles: ROLE_GROUPS.ALL,
    });
    expect(prisma.project.findUnique).not.toHaveBeenCalled();
    expect(prisma.feedback.create).not.toHaveBeenCalled();
  });

  it('deve impedir envio quando o avaliador não participou do projeto', async () => {
    (prisma.project.findUnique as jest.Mock).mockResolvedValue({
      id: 'project-1',
    });
    (prisma.stackTaken.findFirst as jest.Mock).mockResolvedValueOnce(null);

    const response = (await POST(createRequest(validPayload))) as Response;
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      message: MESSAGES.FEEDBACK.NO_PARTICIPATION,
      data: null,
      errors: null,
    });

    expect(prisma.stackTaken.findFirst).toHaveBeenCalledWith({
      where: {
        projectId: 'project-1',
        userId: 'user-1',
      },
    });
    expect(prisma.feedback.create).not.toHaveBeenCalled();
  });

  it('deve impedir envio quando o usuário avaliado não participou do projeto', async () => {
    (prisma.project.findUnique as jest.Mock).mockResolvedValue({
      id: 'project-1',
    });
    (prisma.stackTaken.findFirst as jest.Mock)
      .mockResolvedValueOnce({
        id: 'from-participation',
      })
      .mockResolvedValueOnce(null);

    const response = (await POST(createRequest(validPayload))) as Response;
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      message: MESSAGES.FEEDBACK.NO_PARTICIPATION,
      data: null,
      errors: null,
    });

    expect(prisma.stackTaken.findFirst).toHaveBeenLastCalledWith({
      where: {
        projectId: 'project-1',
        userId: 'user-2',
      },
    });
    expect(prisma.feedback.create).not.toHaveBeenCalled();
  });

  it('deve impedir envio duplicado de feedback no mesmo projeto', async () => {
    (prisma.project.findUnique as jest.Mock).mockResolvedValue({
      id: 'project-1',
    });
    (prisma.stackTaken.findFirst as jest.Mock)
      .mockResolvedValueOnce({
        id: 'from-participation',
      })
      .mockResolvedValueOnce({
        id: 'to-participation',
      });
    (prisma.feedback.findFirst as jest.Mock).mockResolvedValue({
      id: 'feedback-1',
    });

    const response = (await POST(createRequest(validPayload))) as Response;
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      message: MESSAGES.FEEDBACK.ALREADY_GIVEN,
      data: null,
      errors: null,
    });

    expect(prisma.feedback.findFirst).toHaveBeenCalledWith({
      where: {
        projectId: 'project-1',
        fromUserId: 'user-1',
        toUserId: 'user-2',
      },
    });
    expect(prisma.feedback.create).not.toHaveBeenCalled();
  });

  it('deve permitir envio quando todas as regras forem respeitadas', async () => {
    const createdFeedback = {
      id: 'feedback-1',
      projectId: 'project-1',
      fromUserId: 'user-1',
      toUserId: 'user-2',
      rating: 5,
      comment: 'Ótima colaboração.',
      anonymous: false,
      stackTakenId: 'stack-taken-1',
    };

    (prisma.project.findUnique as jest.Mock).mockResolvedValue({
      id: 'project-1',
    });
    (prisma.stackTaken.findFirst as jest.Mock)
      .mockResolvedValueOnce({
        id: 'from-participation',
      })
      .mockResolvedValueOnce({
        id: 'to-participation',
      });
    (prisma.feedback.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.feedback.create as jest.Mock).mockResolvedValue(createdFeedback);

    const response = (await POST(createRequest(validPayload))) as Response;
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toEqual(createdFeedback);

    expect(prisma.feedback.create).toHaveBeenCalledWith({
      data: {
        projectId: 'project-1',
        fromUserId: 'user-1',
        toUserId: 'user-2',
        rating: 5,
        comment: 'Ótima colaboração.',
        anonymous: false,
        stackTakenId: 'stack-taken-1',
      },
    });
    expect(logger.error).not.toHaveBeenCalled();
  });
});
