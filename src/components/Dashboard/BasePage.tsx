import { ReactNode } from 'react';
import { DashboardHeader } from './Header';
import { Navbar } from '@/components/layout/Navbar';

export default async function BasePage({ children }: { children: ReactNode }) {
  return (
    <section className="mn-h-screen flex">
      <Navbar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <div className="">{children}</div>
      </div>
    </section>
  );
}
