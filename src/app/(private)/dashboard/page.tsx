import { Metadata } from 'next';
import BasePage from '@/components/Dashboard/BasePage';
import UnderDevelopment from '@/components/UnderDevelopment';

export const metadata: Metadata = {
  title: 'Dashboard - TryCatch',
  description: 'Bem vindo ao tryCatch',
};

export default function Page() {
  return (
    <BasePage>
      <h1>Dashboard</h1>
      <UnderDevelopment />
    </BasePage>
  );
}
