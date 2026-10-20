import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { checkAuth } from '@/lib/check-auth';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const auth = await checkAuth({ requireAdmin: true });

  if (!auth.authorized) {
    redirect('/dashboard');
  }

  return children;
}
