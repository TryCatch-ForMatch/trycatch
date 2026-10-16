import { ReactNode } from 'react';
import QueryProvider from '@/providers/query.provider';

export default function PortfoliosLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}
