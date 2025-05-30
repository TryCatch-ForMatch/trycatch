import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white p-4">
        <h1>Dashboard - Bem-vindo, {session.user.name}</h1>
      </header>

      <main className="flex-1 p-6 bg-gray-100">{children}</main>

      <footer className="bg-gray-900 text-white p-4 text-center">
        © {new Date().getFullYear()} TryCatch
      </footer>
    </div>
  );
}
