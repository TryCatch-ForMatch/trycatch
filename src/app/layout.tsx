import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
