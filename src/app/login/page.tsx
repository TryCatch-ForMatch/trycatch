import { LoginForm } from '@/components/form/Login/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | TryCatch for Match',
};

export default function LoginPage() {
  return (
    <section className="min-h-screen">
      <LoginForm />
    </section>
  );
}
