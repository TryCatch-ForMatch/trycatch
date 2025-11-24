import { ReactNode } from 'react';
import { DashboardHeader } from './Header';
import { Navbar } from '@/components/layout/Navbar';

export default async function BasePage({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen flex">
      <Navbar />
      <div className="flex flex-1 flex-col pt-14">
        <DashboardHeader />
        <div className="">{children}</div>
      </div>
    </section>
  );
}
