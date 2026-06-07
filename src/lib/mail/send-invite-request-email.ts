import { resend } from '@/lib/mail/resend';
import { InviteRequestReceiverEmail } from '@/lib/mail/templates/invite-request-receiver';

type SendInviteRequestEmailProps = {
  name: string;
  email: string;
  linkedin: string;
  role: 'USER' | 'MENTOR';
};

export async function sendInviteRequestEmail({
  name,
  email,
  linkedin,
  // role,
}: SendInviteRequestEmailProps) {
  const receiver = process.env.INVITE_REQUEST_RECEIVER_EMAIL;
  const sender = process.env.INVITE_REQUEST_SENDER_EMAIL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!receiver) {
    throw new Error('INVITE_REQUEST_RECEIVER_EMAIL is not defined');
  }

  if (!sender) {
    throw new Error('INVITE_REQUEST_SENDER_EMAIL is not defined');
  }

  if (!appUrl) {
    throw new Error('NEXT_PUBLIC_APP_URL is not defined');
  }

  const requestDate = new Date().toLocaleString('pt-BR');

  const adminPanelLink = new URL('/dashboard/admin', appUrl).toString();

  await resend.emails.send({
    from: sender,
    to: receiver,
    subject: 'Nova solicitação de acesso – TryCatch',
    react: InviteRequestReceiverEmail({
      requestDate,
      name,
      email,
      linkedin,
      adminPanelLink,
      appUrl,
    }),
  });
