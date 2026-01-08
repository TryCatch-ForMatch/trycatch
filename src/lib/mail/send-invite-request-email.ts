import { resend } from '@/lib/mail/resend';

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
  role,
}: SendInviteRequestEmailProps) {
  const receiver = process.env.INVITE_REQUEST_RECEIVER_EMAIL;
  const sender = process.env.INVITE_REQUEST_SENDER_EMAIL;

  if (!receiver || !sender) {
    throw new Error('Configuração de email ausente');
  }

  await resend.emails.send({
    from: sender,
    to: receiver,
    subject: 'Nova solicitação de acesso – TryCatch',
    html: `
      <h2>Nova solicitação de acesso</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>
      <p><strong>Perfil solicitado:</strong> ${
        role === 'MENTOR' ? 'Mentor' : 'Membro'
      }</p>
    `,
  });
}
