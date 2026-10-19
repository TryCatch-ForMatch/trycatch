import { ReactNode } from 'react';
import type { Metadata } from 'next';
import QueryProvider from '@/providers/query.provider';

export const metadata: Metadata = {
  title: 'Portfólios',
  description:
    'Conheça os portfólios de desenvolvedores e mentores da comunidade TryCatch For Match.',
};

export default function PortfoliosLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}
