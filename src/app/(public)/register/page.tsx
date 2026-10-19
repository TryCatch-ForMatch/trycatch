import type { Metadata } from 'next';
import RegisterForm from '@/components/form/RegisterForm/RegisterInvite';

export const metadata: Metadata = {
  title: 'Registro',
  description:
    'Conclua seu cadastro no TryCatch For Match a partir do convite recebido.',
};

export default function RegisterPage() {
  return (
    <main>
      <RegisterForm />
    </main>
  );
}
