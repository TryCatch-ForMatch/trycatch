// components/protected-layout.tsx
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { checkAuth } from '@/lib/check-auth';

type ProtectedLayoutProps = {
  children: ReactNode;
  roles?: Array<'ADMIN' | 'USER'>;
};

export default async function ProtectedLayout({
  children,
  roles,
}: ProtectedLayoutProps) {
  const { authorized, session } = await checkAuth({
    allowedRoles: roles,
  });

  if (!authorized) {
    redirect('/login');
  }

  return <>{children}</>;
}
