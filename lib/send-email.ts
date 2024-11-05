import { PayOrder } from '@/components/shared/email-template/pay-order';
import { ReactNode } from 'react';
import { Resend } from 'resend';

interface SendEmailProps {
  to: string,
  react: ReactNode,
  subject: string,
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const SendEmail = async ({ to, react, subject }: SendEmailProps) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to,
    react,
    subject,
  });

  if (error) throw error;

  return data;
}