import { Text, Section, Link } from '@react-email/components';
import { EmailLayout } from './layout/layout';

type ResetPasswordEmailProps = {
  name: string;
  requestDate: string;
  resetLink: string;
  expirationTime: string;
  appUrl: string;
};

export function ResetPasswordEmail({
  name,
  requestDate,
  resetLink,
  expirationTime,
  appUrl,
}: ResetPasswordEmailProps) {
  return (
    <EmailLayout title="Redefinição de senha">
      <Text>Olá {name},</Text>

      <Text>
        Recebemos uma solicitação de redefinição de senha para sua conta no
        TryCatch em <strong>{requestDate}</strong>.
      </Text>

      <Section style={{ marginTop: '16px' }}>
        <Text>Para criar uma nova senha, utilize o link abaixo:</Text>
        <Link href={resetLink}>{resetLink}</Link>
      </Section>

      <Section style={{ marginTop: '16px' }}>
        <Text>
          Este link é válido por <strong>{expirationTime}</strong>.
        </Text>

        <Text>
          Caso o prazo expire, será necessário solicitar uma nova redefinição.
        </Text>
      </Section>

      <Section style={{ marginTop: '16px' }}>
        <Text>
          Se você não solicitou esta alteração, ignore este email. Sua conta
          permanecerá inalterada.
        </Text>

        <Text>Por segurança, nunca compartilhe este link com terceiros.</Text>
      </Section>

      <Section style={{ marginTop: '32px', fontSize: '12px' }}>
        <Text>
          —
          <br />
          TryCatch
          <br />
          Plataforma colaborativa de projetos open source
          <br />
          <Link href={appUrl}>{appUrl}</Link>
        </Text>
      </Section>
    </EmailLayout>
  );
}
