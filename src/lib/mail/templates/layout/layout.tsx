import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Hr,
  Preview,
} from '@react-email/components';

import {
  bodyStyle,
  containerStyle,
  headerStyle,
  headerTitleStyle,
  headerSubtitleStyle,
  contentStyle,
  titleStyle,
  footerStyle,
  dividerStyle,
  footerTextStyle,
  footerLinkStyle,
} from './emails-styles';

type EmailLayoutProps = {
  title: string;
  previewText?: string;
  children: React.ReactNode;
};

export function EmailLayout({
  title,
  previewText,
  children,
}: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      {previewText && <Preview>{previewText}</Preview>}

      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Heading style={headerTitleStyle}>TryCatch</Heading>
            <Text style={headerSubtitleStyle}>
              Plataforma colaborativa de projetos open source
            </Text>
          </Section>

          <Section style={contentStyle}>
            <Heading as="h2" style={titleStyle}>
              {title}
            </Heading>

            {children}
          </Section>

          <Section style={footerStyle}>
            <Hr style={dividerStyle} />

            <Text style={footerTextStyle}>
              © {new Date().getFullYear()} TryCatch
            </Text>

            <Text style={footerTextStyle}>
              Este é um email automático. Não responda a esta mensagem.
            </Text>

            <Text style={footerTextStyle}>
              <Link
                href={process.env.NEXT_PUBLIC_APP_URL}
                style={footerLinkStyle}
              >
                {process.env.NEXT_PUBLIC_APP_URL}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
