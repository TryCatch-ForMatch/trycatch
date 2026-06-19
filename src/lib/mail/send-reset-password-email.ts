import { getResend } from '@/lib/mail/resend';
import { ResetPasswordEmail } from './templates/reset-password';

type SendResetPasswordEmailParams = {
  email: string;
  name: string;
  token: string;
  expiresInMinutes: number;
};

export async function sendResetPasswordEmail({
  email,
  name,
  token,
  expiresInMinutes,
}: SendResetPasswordEmailParams) {
  const sender = process.env.RESET_PASSWORD_EMAIL;
  const appUrl = process.env.NEXTAUTH_URL;

  if (!sender) {
    throw new Error('RESET_PASSWORD_EMAIL is not defined');
  }

  if (!appUrl) {
    throw new Error('NEXTAUTH_URL is not defined');
  }

  const requestDate = new Date().toLocaleString('pt-BR');

  const resetLink = new URL(
    `/reset-password?token=${token}`,
    appUrl
  ).toString();

  await getResend().emails.send({
    from: sender,
    to: email,
    subject: 'Redefinição de senha',
    react: ResetPasswordEmail({
      name,
      requestDate,
      resetLink,
      expirationTime: `${expiresInMinutes} minutos`,
      appUrl,
    }),
  });
}
