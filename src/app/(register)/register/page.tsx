import { Metadata } from 'next';
import RegisterForm from '@/components/Form/RegisterForm/RegisterInvite';

export const metadata: Metadata = {
  title: 'Registro | TryCatch For Match',
  description: 'Bem vindo a melhor plataforma de gerenciamento de projectos',
};

export default function RegisterPage() {
  return (
    <section>
      <RegisterForm />
    </section>
  );
}
