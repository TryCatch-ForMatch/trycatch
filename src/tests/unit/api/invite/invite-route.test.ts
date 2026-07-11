/**
 * @jest-environment node
 */

import { GET, POST } from '@/app/api/invite/route';
import { GET as GET_COUNT } from '@/app/api/invite/count/route';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    invite: {
      count: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    user: {
      findFirst: jest.fn(),
    },
  },
}));

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

type MockRequest = {
  json: () => Promise<unknown>;
};

const authorizeAdmin = () => {
  (checkAuth as jest.Mock).mockResolvedValue({
    authorized: true,
    session: {
      user: { id: 'admin-1', role: 'ADMIN' },
    },
  });
};

describe('GET /api/invite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeAdmin();
  });

  it('deve listar convites em ordem alfabética por email', async () => {
    const invites = [
      {
        id: 'invite-1',
        email: 'ana@example.com',
        code: 'code-1',
        role: 'USER',
        used: false,
      },
    ];

    (prisma.invite.findMany as jest.Mock).mockResolvedValue(invites);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(invites);
    expect(prisma.invite.findMany).toHaveBeenCalledWith({
      orderBy: { email: 'asc' },
    });
  });

  it('deve bloquear listagem para usuário não autorizado', async () => {
    const authResponse = Response.json(
      { error: 'Acesso negado.' },
      {
        status: 403,
      }
    );

    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: false,
      response: authResponse,
    });

    const response = await GET();

    expect(response.status).toBe(403);
    expect(prisma.invite.findMany).not.toHaveBeenCalled();
  });
});

describe('POST /api/invite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeAdmin();
  });

  it('deve criar convite quando email e role forem válidos', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.invite.create as jest.Mock).mockImplementation(({ data }) =>
      Promise.resolve({
        id: 'invite-1',
        email: data.email,
        code: data.code,
        role: data.role,
        used: false,
      })
    );

    const request: MockRequest = {
      json: async () => ({
        email: 'newuser@example.com',
        role: 'USER',
      }),
    };

    const response = await POST(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data).toEqual({
      email: 'newuser@example.com',
      code: expect.any(String),
      role: 'USER',
    });
    expect(body.data.code).toHaveLength(16);
    expect(prisma.invite.create).toHaveBeenCalledWith({
      data: {
        email: 'newuser@example.com',
        code: expect.any(String),
        role: 'USER',
      },
    });
  });

  it('deve retornar 400 quando payload for inválido', async () => {
    const request: MockRequest = {
      json: async () => ({
        email: 'invalid-email',
        role: 'USER',
      }),
    };

    const response = await POST(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.invite.create).not.toHaveBeenCalled();
  });

  it('deve retornar 409 quando já existir convite para o email', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue({
      id: 'invite-existing',
      email: 'existing@example.com',
    });
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    const request: MockRequest = {
      json: async () => ({
        email: 'existing@example.com',
        role: 'USER',
      }),
    };

    const response = await POST(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);
    expect(prisma.invite.create).not.toHaveBeenCalled();
  });

  it('deve retornar 409 quando já existir usuário com o email', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue({
      id: 'user-existing',
      email: 'existing-user@example.com',
    });

    const request: MockRequest = {
      json: async () => ({
        email: 'existing-user@example.com',
        role: 'MENTOR',
      }),
    };

    const response = await POST(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);
    expect(prisma.invite.create).not.toHaveBeenCalled();
  });
});

describe('GET /api/invite/count', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve contar apenas convites não utilizados', async () => {
    (prisma.invite.count as jest.Mock).mockResolvedValue(3);

    const response = await GET_COUNT();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ count: 3 });
    expect(prisma.invite.count).toHaveBeenCalledWith({
      where: { used: false },
    });
  });
});
