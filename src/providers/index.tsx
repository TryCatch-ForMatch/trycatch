'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { SidebarProvider } from '@/Context/SidebarContextOpenClose';

export default function DashboardProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <SessionProvider>{children}</SessionProvider>
    </SidebarProvider>
  );
}
