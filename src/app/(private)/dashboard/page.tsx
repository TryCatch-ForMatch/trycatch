import { Metadata } from 'next';
import BasePage from '@/components/Dashboard/BasePage';
import UnderDevelopment from '@/components/UnderDevelopment';
import { checkAuth } from '@/lib/check-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard - TryCatch',
  description: 'Bem vindo ao tryCatch',
};

export default async function Page() {
  const { authorized, session } = await checkAuth();

  if (!authorized || !session) {
    redirect('/login');
  }

  // admin → vai pra página ADM
  if (session.user.role === 'ADMIN') {
    redirect('/dashboard/admin-page');
  }

  return (
    <BasePage>
      <h1>Dashboard</h1>
      <UnderDevelopment />
    </BasePage>
  );
}
