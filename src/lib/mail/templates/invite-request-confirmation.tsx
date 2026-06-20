import { Text, Section, Link } from '@react-email/components';
import { EmailLayout } from './layout/layout';

type InviteRequestConfirmationEmailProps = {
  name: string;
  requestDate: string;
  requestId: string;
  appUrl: string;
};

export function InviteRequestConfirmationEmail({
  name,
  requestDate,
  requestId,
  appUrl,
}: InviteRequestConfirmationEmailProps) {
  return (
    <EmailLayout
      title="Solicitação recebida com sucesso"
      previewText="Confirmamos o recebimento da sua solicitação de acesso ao TryCatch."
    >
      <Text>Olá {name},</Text>

      <Section style={{ marginTop: '16px' }}>
        <Text>
          Recebemos sua solicitação de acesso ao TryCatch registrada em{' '}
          <strong>{requestDate}</strong>.
        </Text>
      </Section>

      <Section style={{ marginTop: '16px' }}>
        <Text>
          Nossa equipe analisará o pedido e você será notificado por email.
          Sendo aprovado, você receberá um novo email com as instruções para
          concluir seu cadastro.
        </Text>
      </Section>

      <Section style={{ marginTop: '16px' }}>
        <Text>
          Fique atento ao seu email: enviaremos atualizações sobre sua
          solicitação por este endereço. Se não encontrar nossas mensagens na
          caixa de entrada, confira também as pastas Spam, Lixo Eletrônico ou
          Promoções.
        </Text>
      </Section>

      <Section style={{ marginTop: '16px' }}>
        <Text>
          Caso você não tenha realizado esta solicitação, desconsidere esta
          mensagem.
        </Text>
      </Section>

      <Section style={{ marginTop: '32px', fontSize: '12px' }}>
        <Text>
          —
          <br />
          TryCatch
          <br />
          Plataforma colaborativa de projetos
          <br />
          <Link href={appUrl}>{appUrl}</Link>
        </Text>
      </Section>
    </EmailLayout>
  );
}
