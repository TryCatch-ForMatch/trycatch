import { ReactNode } from 'react';
import { DashboardHeader } from './Header';
import { Navbar } from '@/components/Dashboard/Navbar';

export default async function BasePage({ children }: { children: ReactNode }) {
  return (
    <section className="flex min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col pt-14">
        <DashboardHeader />
        <div className="">{children}</div>
      </div>
    </section>
  );
}
