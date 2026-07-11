/**
 * @jest-environment node
 */

import { DELETE, GET, PATCH } from '@/app/api/tech-stack/[id]/route';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    projectStack: {
      findFirst: jest.fn(),
    },
    stack: {
      delete: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

type MockRequest = {
  json?: () => Promise<unknown>;
  nextUrl: {
    pathname: string;
  };
};

const createRequest = (id = 'stack-1', body?: unknown) =>
  ({
    nextUrl: {
      pathname: `/api/tech-stack/${id}`,
    },
    json: body === undefined ? undefined : async () => body,
  }) as MockRequest as NextRequest;

const authorizeAdmin = () => {
  (checkAuth as jest.Mock).mockResolvedValue({
    authorized: true,
    session: {
      user: { id: 'admin-1', role: 'ADMIN' },
    },
  });
};

describe('GET /api/tech-stack/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar stack pelo id', async () => {
    const stack = {
      id: 'stack-1',
      name: 'Node.js',
    };

    (prisma.stack.findUnique as jest.Mock).mockResolvedValue(stack);

    const response = await GET(createRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(stack);
    expect(prisma.stack.findUnique).toHaveBeenCalledWith({
      where: { id: 'stack-1' },
    });
  });

  it('deve retornar 404 quando stack não existir', async () => {
    (prisma.stack.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await GET(createRequest('missing-stack'));
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.success).toBe(false);
  });
});

describe('PATCH /api/tech-stack/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeAdmin();
  });

  it('deve atualizar stack quando não houver conflito', async () => {
    (prisma.stack.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.projectStack.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.stack.update as jest.Mock).mockResolvedValue({
      id: 'stack-1',
      name: 'NestJS',
    });

    const response = await PATCH(
      createRequest('stack-1', {
        name: 'NestJS',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.name).toBe('NestJS');
    expect(prisma.stack.update).toHaveBeenCalledWith({
      where: { id: 'stack-1' },
      data: { name: 'NestJS' },
    });
  });

  it('deve retornar 400 quando payload for inválido', async () => {
    const response = await PATCH(
      createRequest('stack-1', {
        name: '',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.stack.update).not.toHaveBeenCalled();
  });

  it('deve retornar 409 quando nome já existir em outra stack', async () => {
    (prisma.stack.findFirst as jest.Mock).mockResolvedValue({
      id: 'stack-2',
      name: 'Node.js',
    });

    const response = await PATCH(
      createRequest('stack-1', {
        name: 'Node.js',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);
    expect(prisma.stack.update).not.toHaveBeenCalled();
  });

  it('deve retornar 409 quando stack estiver vinculada e forceUpdate não for enviado', async () => {
    (prisma.stack.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.projectStack.findFirst as jest.Mock).mockResolvedValue({
      id: 'project-stack-1',
    });

    const response = await PATCH(
      createRequest('stack-1', {
        name: 'Node.js',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);
    expect(prisma.stack.update).not.toHaveBeenCalled();
  });

  it('deve permitir atualização vinculada quando forceUpdate for true', async () => {
    (prisma.stack.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.projectStack.findFirst as jest.Mock).mockResolvedValue({
      id: 'project-stack-1',
    });
    (prisma.stack.update as jest.Mock).mockResolvedValue({
      id: 'stack-1',
      name: 'Node.js',
    });

    const response = await PATCH(
      createRequest('stack-1', {
        name: 'Node.js',
        forceUpdate: true,
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.name).toBe('Node.js');
    expect(prisma.stack.update).toHaveBeenCalledWith({
      where: { id: 'stack-1' },
      data: { name: 'Node.js' },
    });
  });
});

describe('DELETE /api/tech-stack/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeAdmin();
  });

  it('deve deletar stack sem vínculos', async () => {
    (prisma.projectStack.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.stack.delete as jest.Mock).mockResolvedValue({
      id: 'stack-1',
    });

    const response = await DELETE(createRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual({ deletedId: 'stack-1' });
    expect(prisma.stack.delete).toHaveBeenCalledWith({
      where: { id: 'stack-1' },
    });
  });

  it('deve bloquear remoção quando stack estiver vinculada a projeto', async () => {
    (prisma.projectStack.findFirst as jest.Mock).mockResolvedValue({
      id: 'project-stack-1',
    });

    const response = await DELETE(createRequest());
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);
    expect(prisma.stack.delete).not.toHaveBeenCalled();
  });
});
