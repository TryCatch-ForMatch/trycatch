import { LoginForm } from '@/components/form/Login/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Acesse sua conta no TryCatch For Match.',
};

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
