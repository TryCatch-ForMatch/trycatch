/**
 * @jest-environment node
 */

import { POST as VALIDATE_INVITE } from '@/app/api/auth/register/route';
import { POST as SIGNUP } from '@/app/api/auth/signup/route';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    invite: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

type MockRequest = {
  json: () => Promise<unknown>;
};

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve validar convite ativo para email e código informados', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue({
      id: 'invite-1',
      email: 'member@example.com',
      code: 'valid-code',
      role: 'USER',
      used: false,
    });

    const request: MockRequest = {
      json: async () => ({
        email: 'member@example.com',
        inviteCode: 'valid-code',
      }),
    };

    const response = await VALIDATE_INVITE(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual({
      email: 'member@example.com',
      role: 'USER',
      code: 'valid-code',
    });
    expect(prisma.invite.findFirst).toHaveBeenCalledWith({
      where: {
        email: 'member@example.com',
        code: 'valid-code',
        used: false,
      },
    });
  });

  it('deve retornar 403 quando convite for inválido ou já utilizado', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(null);

    const request: MockRequest = {
      json: async () => ({
        email: 'member@example.com',
        inviteCode: 'used-code',
      }),
    };

    const response = await VALIDATE_INVITE(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.success).toBe(false);
  });
});

describe('POST /api/auth/signup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar usuário e marcar convite como usado', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue({
      id: 'invite-1',
      email: 'member@example.com',
      code: 'valid-code',
      role: 'MENTOR',
      used: false,
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (hash as jest.Mock).mockResolvedValue('hashed-password');
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: 'user-1',
      name: 'Member Test',
      email: 'member@example.com',
      role: 'MENTOR',
    });
    (prisma.invite.update as jest.Mock).mockResolvedValue({
      id: 'invite-1',
      used: true,
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'Member Test',
        email: 'member@example.com',
        password: 'secret123',
        avatar: '',
        linkedin: '',
        github: '',
        bio: 'Backend developer',
        inviteCode: 'valid-code',
      }),
    };

    const response = await SIGNUP(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data).toEqual({
      id: 'user-1',
      name: 'Member Test',
      email: 'member@example.com',
      role: 'MENTOR',
    });
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Member Test',
        email: 'member@example.com',
        password: 'hashed-password',
        avatar: '',
        linkedin: '',
        github: '',
        bio: 'Backend developer',
        role: 'MENTOR',
      },
    });
    expect(prisma.invite.update).toHaveBeenCalledWith({
      where: { id: 'invite-1' },
      data: { used: true },
    });
  });

  it('deve retornar 403 quando convite de cadastro for inválido ou já utilizado', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(null);

    const request: MockRequest = {
      json: async () => ({
        name: 'Member Test',
        email: 'member@example.com',
        password: 'secret123',
        avatar: '',
        linkedin: '',
        github: '',
        bio: 'Backend developer',
        inviteCode: 'used-code',
      }),
    };

    const response = await SIGNUP(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.success).toBe(false);
    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(prisma.invite.update).not.toHaveBeenCalled();
  });
});
