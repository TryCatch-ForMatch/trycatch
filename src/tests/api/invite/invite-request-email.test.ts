import { sendInviteRequestEmail } from '@/lib/mail/send-invite-request-email';

const mockSend = jest.fn().mockResolvedValue({ id: 'email-test-id' });

jest.mock('@/lib/mail/resend', () => ({
  getResend: () => ({
    emails: { send: mockSend },
  }),
}));

describe('sendInviteRequestEmail', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();

    process.env = {
      ...ORIGINAL_ENV,
      INVITE_REQUEST_RECEIVER_EMAIL: 'admin@trycatch.com',
      INVITE_REQUEST_SENDER_EMAIL: 'no-reply@trycatch.com',
      NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
    };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('deve enviar email para o administrador com dados corretos', async () => {
    await sendInviteRequestEmail({
      name: 'User Teste',
      email: 'usertest@email.com',
      linkedin: 'https://www.linkedin.com/in/teste',
      role: 'USER',
    });

    expect(mockSend).toHaveBeenCalledTimes(1);

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'no-reply@trycatch.com',
        to: 'admin@trycatch.com',
        subject: expect.stringContaining('Nova solicitação'),
        react: expect.any(Object),
      })
    );
  });

  it('deve lançar erro se variáveis de ambiente estiverem ausentes', async () => {
    process.env.INVITE_REQUEST_RECEIVER_EMAIL = '';
    process.env.INVITE_REQUEST_SENDER_EMAIL = '';

    await expect(
      sendInviteRequestEmail({
        name: 'User Teste',
        email: 'usertest@email.com',
        linkedin: 'https://www.linkedin.com/in/teste',
        role: 'USER',
      })
    ).rejects.toThrow(/is not defined/);
  });
});
