'use cliente';
import BasePage from '@/components/Dashboard/BasePage';
import { UserAvailabilityForm } from '@/components/Dashboard/User';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configurações | TryCatch',
  description: 'Gerencie suas configurações pessoais e preferências.',
};

export default function UserConfigPage() {
  return (
    <BasePage>
      <div className="relative mx-auto mt-6 max-w-2xl">
        <h1 className="mb-4 text-2xl font-bold">Configurações do Usuário</h1>
        <UserAvailabilityForm />
      </div>
    </BasePage>
  );
}
