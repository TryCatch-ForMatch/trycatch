import type { Metadata } from 'next';
import { Suspense } from 'react';
import UserSignupForm from '@/components/form/RegisterForm/UserSignupForm';

export const metadata: Metadata = {
  title: 'Criar conta',
  description: 'Crie sua conta no TryCatch For Match.',
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
