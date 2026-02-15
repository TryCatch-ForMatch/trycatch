/**
 * @jest-environment node
 */

import { PATCH } from '@/app/api/portfolio/me/route';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    userSkill: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
    userCertificate: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
  },
}));

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

(prisma.user.findUnique as jest.Mock).mockResolvedValue({
  id: 'user-1',
  showEmail: false,
  skills: [],
  certificates: [],
  feedbacksReceived: [],
  stacksTaken: [],
});

describe('PATCH /api/portfolio/me', () => {
  it('should update only provided fields', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: true,
      session: {
        user: { id: 'user-1' },
      },
    });

    (prisma.user.update as jest.Mock).mockResolvedValue({
      id: 'user-1',
      showEmail: false,
    });

    const request = {
      json: async () => ({
        showEmail: false,
      }),
    } as unknown as NextRequest;

    // Usamos "!" (non-null assertion) porque neste teste garantimos
    // que checkAuth retorna authorized = true, então PATCH nunca retorna undefined.
    const response = (await PATCH(request))!;
    const body = await response.json();

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: { showEmail: false },
    });

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
  });

  it('should replace skills when skills are provided', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: true,
      session: {
        user: { id: 'user-1' },
      },
    });

    const request = {
      json: async () => ({
        skills: [{ skillId: 'skill-1' }, { skillId: 'skill-2' }],
      }),
    } as unknown as NextRequest;

    (prisma.user.update as jest.Mock).mockResolvedValue({
      id: 'user-1',
    });

    const response = (await PATCH(request))!;

    expect(prisma.userSkill.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
    });

    expect(prisma.userSkill.createMany).toHaveBeenCalledWith({
      data: [
        { userId: 'user-1', skillId: 'skill-1' },
        { userId: 'user-1', skillId: 'skill-2' },
      ],
    });

    expect(response.status).toBe(200);
  });
});
