import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendResetPasswordEmailParams = {
  email: string;
  token: string;
};

export async function sendResetPasswordEmail({
  email,
  token,
}: SendResetPasswordEmailParams) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'TryCatch <trycatchformatch@gmail.com>',
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
}
