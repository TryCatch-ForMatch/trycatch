import { sendInviteRequestConfirmationEmail } from '@/lib/mail/send-invite-request-confirmation-email';

const mockSend = jest.fn().mockResolvedValue({ id: 'test-email-id' });

jest.mock('@/lib/mail/resend', () => ({
  getResend: () => ({
    emails: { send: mockSend },
  }),
}));

describe('sendInviteRequestConfirmationEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar resend.emails.send com os dados corretos', async () => {
    await sendInviteRequestConfirmationEmail({
      name: 'User Test',
      email: 'usertest@email.com',
      requestDate: '01/01/2026',
      requestId: 'abc-123',
    });

    expect(mockSend).toHaveBeenCalledTimes(1);

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'usertest@email.com',
        subject: expect.stringContaining('Confirmação'),
      })
    );
  });
});
