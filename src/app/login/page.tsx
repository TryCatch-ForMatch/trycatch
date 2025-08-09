import { LoginForm } from '@/components/form/Login/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | TryCatch For Match',
  description: 'Bem vindo a melhor plataforma de gerenciamento de projectos',
};

export default function LoginPage() {
  return (
    <section className="min-h-screen">
      <LoginForm />
    </section>
  );
}
