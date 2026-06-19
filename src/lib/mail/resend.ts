import { Resend } from 'resend';

export function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not defined');
  return new Resend(apiKey);
}
