'use client';

import './globals.css';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionProvider>
          {/* Navbar será componente separado */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
