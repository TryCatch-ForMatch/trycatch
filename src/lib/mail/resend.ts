import { Resend } from 'resend';

export const resend = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not defined');
  }

  return new Resend(process.env.RESEND_API_KEY);
};
