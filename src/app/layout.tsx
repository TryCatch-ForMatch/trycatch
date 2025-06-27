import { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Navbar será componente separado */}
        {children}
      </body>
    </html>
  );
}
