/**
 * @jest-environment node
 */

import { POST } from '@/app/api/invite-request/route';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    inviteRequest: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('@/lib/mail/send-invite-request-email', () => ({
  sendInviteRequestEmail: jest.fn(),
}));

jest.mock('@/lib/mail/send-invite-request-confirmation-email', () => ({
  sendInviteRequestConfirmationEmail: jest.fn(),
}));

type MockRequest = {
  json: () => Promise<unknown>;
};

describe('POST /api/invite-request', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar solicitação e retornar 201', async () => {
    (prisma.inviteRequest.findUnique as jest.Mock).mockResolvedValue(null);

    (prisma.inviteRequest.create as jest.Mock).mockResolvedValue({
      id: 'req-123',
      status: 'PENDING',
    });

    const mockRequest: MockRequest = {
      json: async () => ({
        name: 'User Teste',
        email: 'usertest@email.com',
        linkedin: 'https://www.linkedin.com/in/teste',
        role: 'USER',
      }),
    };

    const response = await POST(mockRequest as never);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data.id).toBe('req-123');
  });

  it('deve retornar 409 se já existir solicitação', async () => {
    (prisma.inviteRequest.findUnique as jest.Mock).mockResolvedValue({
      id: 'existing-id',
    });

    const mockRequest: MockRequest = {
      json: async () => ({
        name: 'User Teste',
        email: 'usertest@email.com',
        linkedin: 'https://www.linkedin.com/in/teste',
        role: 'USER',
      }),
    };

    const response = await POST(mockRequest as never);

    expect(response.status).toBe(409);
  });

  it('deve retornar 400 para dados inválidos', async () => {
    const mockRequest: MockRequest = {
      json: async () => ({
        name: '',
        email: 'email-invalido',
        linkedin: 'link-errado',
        role: 'USER',
      }),
    };

    const response = await POST(mockRequest as never);

    expect(response.status).toBe(400);
  });
});
