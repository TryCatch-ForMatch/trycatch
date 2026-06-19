import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import type { CreateEmailOptions } from 'resend';
import { logger } from '@/lib/logger';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      logger.warn('RESEND_API_KEY is not defined', 'POST /api/contact');
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, subject, message } = await request.json();

    if (!name || !subject || !message) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const emailOptions: CreateEmailOptions = {
      from: 'TryCatch <no-reply@trycatch.app.br>',
      to: [process.env.CONTACT_SENDER_EMAIL as string],
      subject: `[Contato] ${subject}`,
      html: `
        <strong>Nome:</strong> ${name}<br/>
        ${email ? `<strong>E-mail:</strong> ${email}<br/><br/>` : ''}
        <strong>Mensagem:</strong><br/>
        ${message}
      `,
    };

    // ✅ replyTo só quando for válido
    if (email && isValidEmail(email)) {
      emailOptions.replyTo = email;
    }

    const result = await resend.emails.send(emailOptions);

    if (result.error) {
      logger.error('Resend error:', 'POST /api/contact', {
        error:
          result.error instanceof Error
            ? result.error.message
            : String(result.error),
      });
      return NextResponse.json(
        { error: 'Erro ao enviar e-mail' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Contact API error:', 'POST /api/contact', {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
