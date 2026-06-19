import { Text, Section, Link } from '@react-email/components';
import { EmailLayout } from './layout/layout';

type ContactSenderEmailProps = {
  name: string;
  requestDate: string;
  responseTimeframe: string;
  contactId: string;
  appUrl: string;
};

export function ContactSenderEmail({
  name,
  requestDate,
  responseTimeframe,
  contactId,
  appUrl,
}: ContactSenderEmailProps) {
  return (
    <EmailLayout title="Mensagem recebida">
      <Text>Olá {name},</Text>

      <Text>
        Recebemos sua mensagem enviada pelo formulário de contato do TryCatch em{' '}
        <strong>{requestDate}</strong>.
      </Text>

      <Section style={{ marginTop: '16px' }}>
        <Text>
          Nossa equipe analisará o conteúdo e retornará em até{' '}
          <strong>{responseTimeframe}</strong>.
        </Text>
      </Section>

      <Section style={{ marginTop: '16px' }}>
        <Text>
          Caso você não tenha enviado esta mensagem, desconsidere este email.
        </Text>
      </Section>

      <Section style={{ marginTop: '16px' }}>
        <Text>
          Protocolo da solicitação: <strong>{contactId}</strong>
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
