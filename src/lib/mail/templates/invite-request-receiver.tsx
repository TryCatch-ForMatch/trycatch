import { Text, Link, Section } from '@react-email/components';
import { EmailLayout } from './layout/layout';

type InviteRequestReceiverEmailProps = {
  requestDate: string;
  name: string;
  email: string;
  linkedin: string;
  adminPanelLink: string;
  appUrl: string;
};

export function InviteRequestReceiverEmail({
  requestDate,
  name,
  email,
  linkedin,
  adminPanelLink,
  appUrl,
}: InviteRequestReceiverEmailProps) {
  return (
    <EmailLayout title="Nova solicitação de acesso registrada">
      <Text>
        Uma nova solicitação de acesso ao TryCatch foi registrada em{' '}
        <strong>{requestDate}</strong>.
      </Text>

      <Section style={{ marginTop: '24px' }}>
        <Text>
          <strong>Informações do solicitante:</strong>
        </Text>
        <Text>Nome: {name}</Text>
        <Text>Email: {email}</Text>
        <Text>LinkedIn: {linkedin}</Text>
      </Section>

      <Section style={{ marginTop: '24px' }}>
        <Text>
          Para analisar a solicitação, acesse o painel administrativo:
        </Text>
        <Link href={adminPanelLink}>{adminPanelLink}</Link>
      </Section>

      <Section style={{ marginTop: '24px' }}>
        <Text>
          Caso considere a solicitação indevida ou inconsistente, nenhuma ação é
          necessária.
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
