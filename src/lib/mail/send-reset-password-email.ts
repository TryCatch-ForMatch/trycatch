import { Resend } from 'resend';

type SendResetPasswordEmailParams = {
  email: string;
  token: string;
};

export async function sendResetPasswordEmail({
  email,
  token,
}: SendResetPasswordEmailParams) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not defined');
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const resetUrl = `${process.env.NEXTAUTH_URL}reset-password?token=${token}`;

    console.log('📧 Chamando Resend para:', email);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Redefinição de senha',
      html: `
    <p>Recebemos uma solicitação para redefinir sua senha.</p>

    <p>
        <a href="${resetUrl}">
          Clique aqui para redefinir sua senha
        </a>
      </p>

      <p>Este link é válido por tempo limitado.</p>

      <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
    `,
    });
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    throw error;
  }
}
