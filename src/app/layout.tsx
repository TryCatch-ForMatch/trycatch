'use client';

import './globals.css';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionProvider>
          <Toaster position="top-center" />
          {/* Navbar será componente separado */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
