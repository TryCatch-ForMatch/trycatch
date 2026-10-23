'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { SidebarProvider } from '@/Context/SidebarContextOpenClose';
import QueryProvider from './query.provider';

export default function DashboardProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryProvider>
      <SidebarProvider>
        <SessionProvider>{children}</SessionProvider>
      </SidebarProvider>
    </QueryProvider>
  );
}
