/**
 * @jest-environment node
 */

import { DELETE, GET, PATCH } from '@/app/api/invite/[id]/route';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    invite: {
      delete: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
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
  json?: () => Promise<unknown>;
  nextUrl: {
    pathname: string;
  };
};

const createRequest = (id = 'invite-1', body?: unknown) =>
  ({
    nextUrl: {
      pathname: `/api/invite/${id}`,
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

describe('GET /api/invite/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeAdmin();
  });

  it('deve retornar convite pelo id', async () => {
    const invite = {
      id: 'invite-1',
      email: 'member@example.com',
      code: 'abc123',
      role: 'USER',
      used: false,
    };

    (prisma.invite.findUnique as jest.Mock).mockResolvedValue(invite);

    const response = await GET(createRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(invite);
    expect(prisma.invite.findUnique).toHaveBeenCalledWith({
      where: { id: 'invite-1' },
    });
  });

  it('deve retornar 404 quando convite não existir', async () => {
    (prisma.invite.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await GET(createRequest('missing-id'));
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.success).toBe(false);
  });
});

describe('PATCH /api/invite/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeAdmin();
  });

  it('deve atualizar email e role do convite', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.invite.update as jest.Mock).mockResolvedValue({
      id: 'invite-1',
      email: 'updated@example.com',
      role: 'MENTOR',
      code: 'abc123',
      used: false,
    });

    const response = await PATCH(
      createRequest('invite-1', {
        email: 'updated@example.com',
        role: 'MENTOR',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.email).toBe('updated@example.com');
    expect(body.role).toBe('MENTOR');
    expect(prisma.invite.update).toHaveBeenCalledWith({
      where: { id: 'invite-1' },
      data: {
        email: 'updated@example.com',
        role: 'MENTOR',
      },
    });
  });

  it('deve retornar 400 quando body não tiver email ou role', async () => {
    const response = await PATCH(
      createRequest('invite-1', {
        email: 'updated@example.com',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.invite.update).not.toHaveBeenCalled();
  });

  it('deve retornar 409 quando email já estiver em outro convite', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue({
      id: 'invite-2',
      email: 'taken@example.com',
    });
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    const response = await PATCH(
      createRequest('invite-1', {
        email: 'taken@example.com',
        role: 'USER',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);
    expect(prisma.invite.findFirst).toHaveBeenCalledWith({
      where: {
        email: 'taken@example.com',
        NOT: { id: 'invite-1' },
      },
    });
    expect(prisma.invite.update).not.toHaveBeenCalled();
  });

  it('deve retornar 409 quando email já pertencer a usuário', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue({
      id: 'user-1',
      email: 'user@example.com',
    });

    const response = await PATCH(
      createRequest('invite-1', {
        email: 'user@example.com',
        role: 'USER',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);
    expect(prisma.invite.update).not.toHaveBeenCalled();
  });
});

describe('DELETE /api/invite/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeAdmin();
  });

  it('deve deletar convite pelo id', async () => {
    (prisma.invite.delete as jest.Mock).mockResolvedValue({
      id: 'invite-1',
    });

    const response = await DELETE(createRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ message: 'Convite deletado com sucesso.' });
    expect(prisma.invite.delete).toHaveBeenCalledWith({
      where: { id: 'invite-1' },
    });
  });
});
