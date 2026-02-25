import { sendInviteRequestConfirmationEmail } from '@/lib/mail/send-invite-request-confirmation-email';
import { resend } from '@/lib/mail/resend';

jest.mock('@/lib/mail/resend', () => ({
  resend: {
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'test-email-id' }),
    },
  },
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

    expect(resend.emails.send).toHaveBeenCalledTimes(1);

    expect(resend.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'usertest@email.com',
        subject: expect.stringContaining('Confirmação'),
      })
    );
  });
});
