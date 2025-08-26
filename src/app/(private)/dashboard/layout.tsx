import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/Dashboard/Header';
import { DashboardFooter } from '@/components/Dashboard/Footer';
import { Navbar } from '@/components/Layout/Navbar';

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
    <div>
      <Navbar></Navbar>
      <div className="pl-[272px]">
        <DashboardHeader user={session.user} />
        <main>{children}</main>
        <DashboardFooter />
      </div>
    </div>
  );
}
