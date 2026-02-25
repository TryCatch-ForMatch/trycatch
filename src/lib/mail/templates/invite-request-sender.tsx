import { Text, Section, Link } from '@react-email/components';
import { EmailLayout } from './layout/layout';

type InviteRequestSenderEmailProps = {
  name: string;
  requestDate: string;
  reviewTimeframe: string;
  appUrl: string;
};

export function InviteRequestSenderEmail({
  name,
  requestDate,
  reviewTimeframe,
  appUrl,
}: InviteRequestSenderEmailProps) {
  return (
    <EmailLayout title="Solicitação recebida">
      <Text>Olá {name},</Text>

      <Text>
        Recebemos sua solicitação de acesso ao TryCatch em{' '}
        <strong>{requestDate}</strong>.
      </Text>

      <Section style={{ marginTop: '16px' }}>
        <Text>
          Nossa equipe analisará o pedido em até{' '}
          <strong>{reviewTimeframe}</strong>.
        </Text>

        <Text>
          Caso aprovado, você receberá um novo email com as instruções para
          concluir seu cadastro.
        </Text>
      </Section>

      <Section style={{ marginTop: '16px' }}>
        <Text>
          Se você não realizou esta solicitação, desconsidere esta mensagem.
        </Text>
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
