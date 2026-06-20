/**
 * @jest-environment node
 */

import { GET, POST } from '@/app/api/tech-stack/route';
import { GET as GET_COUNT } from '@/app/api/tech-stack/count/route';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    stack: {
      count: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
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

describe('GET /api/tech-stack', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve listar stacks em ordem alfabética', async () => {
    const stacks = [
      {
        id: 'stack-1',
        name: 'Node.js',
      },
    ];

    (prisma.stack.findMany as jest.Mock).mockResolvedValue(stacks);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(stacks);
    expect(prisma.stack.findMany).toHaveBeenCalledWith({
      orderBy: { name: 'asc' },
    });
  });
});

describe('POST /api/tech-stack', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeAdmin();
  });

  it('deve criar stack quando nome for válido e não existir conflito', async () => {
    (prisma.stack.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.stack.create as jest.Mock).mockResolvedValue({
      id: 'stack-1',
      name: 'Node.js',
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'Node.js',
      }),
    };

    const response = await POST(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data).toEqual({
      id: 'stack-1',
      name: 'Node.js',
    });
    expect(prisma.stack.create).toHaveBeenCalledWith({
      data: { name: 'Node.js' },
    });
  });

  it('deve retornar 400 quando payload for inválido', async () => {
    const request: MockRequest = {
      json: async () => ({
        name: '',
      }),
    };

    const response = await POST(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.stack.create).not.toHaveBeenCalled();
  });

  it('deve retornar 409 quando stack já existir', async () => {
    (prisma.stack.findUnique as jest.Mock).mockResolvedValue({
      id: 'stack-existing',
      name: 'Node.js',
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'Node.js',
      }),
    };

    const response = await POST(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);
    expect(prisma.stack.create).not.toHaveBeenCalled();
  });

  it('deve bloquear criação para usuário não autorizado', async () => {
    const authResponse = Response.json(
      { error: 'Acesso negado.' },
      { status: 403 }
    );

    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: false,
      response: authResponse,
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'Node.js',
      }),
    };

    const response = await POST(request as NextRequest);

    expect(response.status).toBe(403);
    expect(prisma.stack.create).not.toHaveBeenCalled();
  });
});

describe('GET /api/tech-stack/count', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar total de stacks', async () => {
    (prisma.stack.count as jest.Mock).mockResolvedValue(5);

    const response = await GET_COUNT();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ count: 5 });
    expect(prisma.stack.count).toHaveBeenCalledWith();
  });
});
