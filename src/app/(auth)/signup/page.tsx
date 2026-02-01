import { Metadata } from 'next';
import { Suspense } from 'react';
import UserSignupForm from '@/components/form/RegisterForm/UserSignupForm';

export const metadata: Metadata = {
  title: 'Registro | TryCatch For Match',
  description: 'Bem vindo a melhor plataforma de gerenciamento de projectos',
};

export default function SignupPage() {
  return (
    <>
      <div>
        <Suspense fallback={<div>Carregando formulário...</div>}>
          <UserSignupForm />
        </Suspense>
      </div>
    </>
  );
}
