/**
 * @jest-environment node
 */

import { DELETE, GET, PUT } from '@/app/api/user/[id]/route';
import { MESSAGES } from '@/constants/messages';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    stackTaken: {
      findFirst: jest.fn(),
    },
    user: {
      delete: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    userSkill: {
      deleteMany: jest.fn(),
    },
  },
}));

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

type MockRequest = {
  json?: () => Promise<unknown>;
};

const userId = 'user-12345678901234567890';
const otherUserId = 'user-09876543210987654321';

const createRequest = (body?: unknown) =>
  ({
    json: body === undefined ? undefined : async () => body,
  }) as MockRequest as NextRequest;

const createContext = (id = userId) => ({
  params: { id },
});

const authorizeUser = (id = userId, role = 'USER') => {
  (checkAuth as jest.Mock).mockResolvedValue({
    authorized: true,
    session: {
      user: { id, role },
    },
  });
};

const validPayload = {
  name: 'Usuário TryCatch',
  email: 'user@trycatch.dev',
  password: '',
  avatar: null,
  linkedin: '',
  github: '',
  bio: 'Perfil em atualização.',
};

describe('GET /api/user/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeUser();
  });

  it('retorna usuário por id com suas skills', async () => {
    const user = {
      id: userId,
      name: 'Usuário TryCatch',
      email: 'user@trycatch.dev',
      skills: [],
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

    const response = await GET(createRequest(), createContext());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(user);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
      include: {
        skills: {
          include: { skill: true },
        },
      },
    });
  });

  it('retorna 400 quando id é inválido', async () => {
    const response = await GET(createRequest(), createContext('short'));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toMatchObject({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
    });
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });
});

describe('PUT /api/user/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeUser();
    (hash as jest.Mock).mockResolvedValue('hashed-password');
  });

  it('bloqueia atualização quando usuário não é dono do perfil', async () => {
    authorizeUser(otherUserId);

    const response = await PUT(createRequest(validPayload), createContext());
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body).toMatchObject({
      success: false,
      message: MESSAGES.AUTH.UNAUTHORIZED,
    });
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('retorna 400 quando payload é inválido', async () => {
    const response = await PUT(
      createRequest({
        ...validPayload,
        name: '',
        email: 'email inválido',
      }),
      createContext()
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('bloqueia e-mail já usado por outro usuário', async () => {
    (prisma.user.findUnique as jest.Mock)
      .mockResolvedValueOnce({ id: userId })
      .mockResolvedValueOnce({ id: otherUserId, email: validPayload.email });

    const response = await PUT(createRequest(validPayload), createContext());
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toMatchObject({
      success: false,
      message: MESSAGES.USER.ALREADY_EXISTS,
    });
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('atualiza usuário válido e envia senha hasheada quando informada', async () => {
    const payload = {
      ...validPayload,
      password: 'secret123',
      avatar: 'https://cdn.example.com/avatar.png',
      linkedin: 'https://www.linkedin.com/in/trycatch',
      github: 'https://github.com/TryCatch-ForMatch',
    };
    const updatedUser = { id: userId, ...payload, password: 'hashed-password' };

    (prisma.user.findUnique as jest.Mock)
      .mockResolvedValueOnce({ id: userId })
      .mockResolvedValueOnce(null);
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const response = await PUT(createRequest(payload), createContext());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(updatedUser);
    expect(hash).toHaveBeenCalledWith('secret123', 10);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: {
        name: payload.name,
        email: payload.email,
        password: 'hashed-password',
        avatar: payload.avatar,
        linkedin: payload.linkedin,
        github: payload.github,
        bio: payload.bio,
      },
    });
  });
});

describe('DELETE /api/user/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeUser();
  });

  it('bloqueia remoção quando usuário não é dono nem admin', async () => {
    authorizeUser(otherUserId);

    const response = await DELETE(createRequest(), createContext());
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body).toMatchObject({
      success: false,
      message: MESSAGES.AUTH.UNAUTHORIZED,
    });
    expect(prisma.user.delete).not.toHaveBeenCalled();
  });

  it('desativa usuário quando existem vínculos em StackTaken', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: userId });
    (prisma.stackTaken.findFirst as jest.Mock).mockResolvedValue({
      id: 'stack-taken-1',
    });
    (prisma.user.update as jest.Mock).mockResolvedValue({
      id: userId,
      isActive: false,
    });

    const response = await DELETE(createRequest(), createContext());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe(
      'Usuário desativado (soft delete) devido a vínculos em StackTaken.'
    );
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: { isActive: false },
    });
    expect(prisma.user.delete).not.toHaveBeenCalled();
  });

  it('remove usuário e skills quando não existem vínculos em StackTaken', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: userId });
    (prisma.stackTaken.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.userSkill.deleteMany as jest.Mock).mockResolvedValue({ count: 2 });
    (prisma.user.delete as jest.Mock).mockResolvedValue({ id: userId });

    const response = await DELETE(createRequest(), createContext());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      success: true,
      message: MESSAGES.USER.DELETED,
    });
    expect(prisma.userSkill.deleteMany).toHaveBeenCalledWith({
      where: { userId },
    });
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });
});
