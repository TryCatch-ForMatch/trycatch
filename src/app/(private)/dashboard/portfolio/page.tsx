import { redirect } from 'next/navigation';
import { checkAuth } from '@/lib/check-auth';
import DashboardPortfolioClient from './DashboardPortfolioClient';

export default async function DashboardPortfolioPage() {
  const { authorized } = await checkAuth();

  if (!authorized) {
    redirect('/login');
  }

  return <DashboardPortfolioClient />;
}
