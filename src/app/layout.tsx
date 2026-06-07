'use client';

import './globals.css';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/sonner';
import { Poppins } from 'next/font/google';
import { SidebarProvider } from '@/Context/SidebarContextOpenClose';
import QueryProvider from '@/providers/query.provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>
        <QueryProvider>
          <SidebarProvider>
          <SessionProvider>
            <Toaster position="top-center" />
            {children}
          </SessionProvider>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
