import { Resend } from 'resend';

export const resend = () => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not defined');
    return;
  }

  return new Resend(process.env.RESEND_API_KEY);
};
