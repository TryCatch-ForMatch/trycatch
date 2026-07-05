/**
 * @jest-environment node
 */

import { POST as POST_FORGOT_PASSWORD } from '@/app/api/auth/forgot-password/route';
import { POST as POST_REGISTER } from '@/app/api/auth/register/route';
import { POST as POST_RESET_PASSWORD } from '@/app/api/auth/reset-password/route';
import { POST as POST_SIGNUP } from '@/app/api/auth/signup/route';
import { GET as GET_VALIDATE_RESET_TOKEN } from '@/app/api/auth/validate-reset-token/route';
import { prisma } from '@/lib/prisma';
import { sendResetPasswordEmail } from '@/lib/mail/send-reset-password-email';
import { generateUniqueUsername } from '@/lib/generate-username';
import { hash } from 'bcryptjs';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    invite: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    passwordResetToken: {
      create: jest.fn(),
      delete: jest.fn(),
      findFirst: jest.fn(),
    },
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

jest.mock('@/lib/generate-username', () => ({
  generateUniqueUsername: jest.fn(),
}));

jest.mock('@/lib/mail/send-reset-password-email', () => ({
  sendResetPasswordEmail: jest.fn(),
}));

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => {
  const mockedHash = jest.fn();

  return {
    __esModule: true,
    default: {
      hash: mockedHash,
    },
    hash: mockedHash,
  };
});

function createRequest(body: unknown): NextRequest {
  return {
    json: async () => body,
  } as NextRequest;
}

function createUrlRequest(url: string): NextRequest {
  return {
    nextUrl: new URL(url),
  } as NextRequest;
}

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve validar convite ativo para o email informado', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue({
      email: 'maria@example.com',
      code: 'INVITE123',
      role: 'USER',
    });

    const response = await POST_REGISTER(
      createRequest({
        email: 'maria@example.com',
        inviteCode: 'INVITE123',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual({
      email: 'maria@example.com',
      role: 'USER',
      code: 'INVITE123',
    });
    expect(prisma.invite.findFirst).toHaveBeenCalledWith({
      where: {
        email: 'maria@example.com',
        code: 'INVITE123',
        used: false,
      },
    });
  });

  it('deve rejeitar convite inexistente ou já utilizado', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(null);

    const response = await POST_REGISTER(
      createRequest({
        email: 'maria@example.com',
        inviteCode: 'INVITE123',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.success).toBe(false);
  });
});

describe('POST /api/auth/signup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (hash as jest.Mock).mockResolvedValue('hashed-password');
    (generateUniqueUsername as jest.Mock).mockResolvedValue('maria-silva');
  });

  it('deve criar usuário com convite válido e marcar convite como usado', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue({
      id: 'invite-1',
      email: 'maria@example.com',
      code: 'INVITE123',
      role: 'USER',
      used: false,
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: 'user-1',
      name: 'Maria Silva',
      email: 'maria@example.com',
      role: 'USER',
    });
    (prisma.invite.update as jest.Mock).mockResolvedValue({
      id: 'invite-1',
      used: true,
    });

    const response = await POST_SIGNUP(
      createRequest({
        name: 'Maria Silva',
        email: 'maria@example.com',
        password: 'secret123',
        avatar: '',
        linkedin: '',
        github: '',
        bio: 'Frontend developer',
        inviteCode: 'INVITE123',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data).toEqual({
      id: 'user-1',
      name: 'Maria Silva',
      email: 'maria@example.com',
      role: 'USER',
    });
    expect(hash).toHaveBeenCalledWith('secret123', 10);
    expect(generateUniqueUsername).toHaveBeenCalledWith('Maria Silva');
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Maria Silva',
        userName: 'maria-silva',
        email: 'maria@example.com',
        password: 'hashed-password',
        avatar: '',
        linkedin: '',
        github: '',
        bio: 'Frontend developer',
        role: 'USER',
      },
    });
    expect(prisma.invite.update).toHaveBeenCalledWith({
      where: { id: 'invite-1' },
      data: { used: true },
    });
  });

  it('deve retornar 400 quando payload for inválido', async () => {
    const response = await POST_SIGNUP(
      createRequest({
        name: '',
        email: 'email-invalido',
        password: '123',
        avatar: '',
        linkedin: '',
        github: '',
        inviteCode: '',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it('deve retornar 400 quando usuário já existir', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue({
      id: 'invite-1',
      email: 'maria@example.com',
      code: 'INVITE123',
      role: 'USER',
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'user-existing',
      email: 'maria@example.com',
    });

    const response = await POST_SIGNUP(
      createRequest({
        name: 'Maria Silva',
        email: 'maria@example.com',
        password: 'secret123',
        avatar: '',
        linkedin: '',
        github: '',
        bio: '',
        inviteCode: 'INVITE123',
      })
    );

    expect(response.status).toBe(400);
    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(prisma.invite.update).not.toHaveBeenCalled();
  });
});

describe('POST /api/auth/forgot-password', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar 400 para email inválido', async () => {
    const response = await POST_FORGOT_PASSWORD(
      createRequest({
        email: 'email-invalido',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.passwordResetToken.create).not.toHaveBeenCalled();
  });

  it('deve responder com sucesso sem revelar se email não existe', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await POST_FORGOT_PASSWORD(
      createRequest({
        email: 'missing@example.com',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(prisma.passwordResetToken.create).not.toHaveBeenCalled();
    expect(sendResetPasswordEmail).not.toHaveBeenCalled();
  });

  it('deve gerar token e enviar email quando usuário existir', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      email: 'maria@example.com',
      name: 'Maria Silva',
    });
    (prisma.passwordResetToken.create as jest.Mock).mockResolvedValue({
      id: 'token-1',
    });
    (sendResetPasswordEmail as jest.Mock).mockResolvedValue(undefined);

    const response = await POST_FORGOT_PASSWORD(
      createRequest({
        email: 'maria@example.com',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(prisma.passwordResetToken.create).toHaveBeenCalledWith({
      data: {
        email: 'maria@example.com',
        token: expect.any(String),
        expiresAt: expect.any(Date),
      },
    });
    expect(sendResetPasswordEmail).toHaveBeenCalledWith({
      email: 'maria@example.com',
      name: 'Maria Silva',
      token: expect.any(String),
      expiresInMinutes: 30,
    });
  });
});

describe('GET /api/auth/validate-reset-token', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar 400 quando token não for informado', async () => {
    const response = await GET_VALIDATE_RESET_TOKEN(
      createUrlRequest('http://localhost/api/auth/validate-reset-token')
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.passwordResetToken.findFirst).not.toHaveBeenCalled();
  });

  it('deve aceitar token existente e não expirado', async () => {
    (prisma.passwordResetToken.findFirst as jest.Mock).mockResolvedValue({
      id: 'token-1',
      email: 'maria@example.com',
      expiresAt: new Date(Date.now() + 1000 * 60 * 30),
    });

    const response = await GET_VALIDATE_RESET_TOKEN(
      createUrlRequest(
        'http://localhost/api/auth/validate-reset-token?token=valid-token'
      )
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(prisma.passwordResetToken.findFirst).toHaveBeenCalledWith({
      where: {
        token: expect.any(String),
      },
    });
  });
});

describe('POST /api/auth/reset-password', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (hash as jest.Mock).mockResolvedValue('new-hashed-password');
  });

  it('deve retornar 400 para token inválido', async () => {
    (prisma.passwordResetToken.findFirst as jest.Mock).mockResolvedValue(null);

    const response = await POST_RESET_PASSWORD(
      createRequest({
        token: 'invalid-token',
        password: 'secret123',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('deve atualizar senha e remover token usado', async () => {
    (prisma.passwordResetToken.findFirst as jest.Mock).mockResolvedValue({
      id: 'token-1',
      email: 'maria@example.com',
      expiresAt: new Date(Date.now() + 1000 * 60 * 30),
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'user-1',
      email: 'maria@example.com',
    });
    (prisma.user.update as jest.Mock).mockResolvedValue({
      id: 'user-1',
      password: 'new-hashed-password',
    });
    (prisma.passwordResetToken.delete as jest.Mock).mockResolvedValue({
      id: 'token-1',
    });
    (prisma.$transaction as jest.Mock).mockResolvedValue([]);

    const response = await POST_RESET_PASSWORD(
      createRequest({
        token: 'valid-token',
        password: 'secret123',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(hash).toHaveBeenCalledWith('secret123', 10);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: { password: 'new-hashed-password' },
    });
    expect(prisma.passwordResetToken.delete).toHaveBeenCalledWith({
      where: { id: 'token-1' },
    });
    expect(prisma.$transaction).toHaveBeenCalledWith([
      expect.any(Promise),
      expect.any(Promise),
    ]);
  });
});
