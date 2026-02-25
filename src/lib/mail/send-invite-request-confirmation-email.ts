import { resend } from '@/lib/mail/resend';
import { InviteRequestConfirmationEmail } from '@/lib/mail/templates/invite-request-confirmation';

type SendInviteRequestConfirmationEmailProps = {
  name: string;
  email: string;
  requestDate: string;
  requestId: string;
};

export async function sendInviteRequestConfirmationEmail({
  name,
  email,
  requestDate,
  requestId,
}: SendInviteRequestConfirmationEmailProps) {
  await resend.emails.send({
    from: 'TryCatch <no-reply@trycatch.app.br>',
    to: email,
    subject: 'Confirmação de solicitação de acesso — TryCatch',
    react: InviteRequestConfirmationEmail({
      name,
      requestDate,
      requestId,
      appUrl: process.env.NEXT_PUBLIC_APP_URL!,
    }),
  });
}
