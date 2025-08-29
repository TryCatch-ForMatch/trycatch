import { ReactNode } from 'react';
import { DashboardHeader } from './Header';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import { User } from '@/types/user';
import { Navbar } from '@/components/layout/Navbar';
export default async function BasePage({ children }: { children: ReactNode }) {
  //   const session = await getServerSession(authOptions);

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
