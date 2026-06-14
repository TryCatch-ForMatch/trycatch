import { ReactNode } from 'react';
import { DashboardHeader } from '@/components/Dashboard/Header';
import { Navbar } from '@/components/Dashboard/Navbar';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="flex min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 pt-20">{children}</main>
      </div>
    </section>
  );
}
