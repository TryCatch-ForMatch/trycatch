'use cliente';
import { UserAvailabilityForm } from '@/components/Dashboard/User';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configurações | TryCatch',
  description: 'Gerencie suas configurações pessoais e preferências.',
};

export default function UserConfigPage() {
  return (
    <div className="relative mx-auto mt-6 p-10">
      <h1 className="mb-4 text-2xl font-bold">Configurações do Usuário</h1>
      <UserAvailabilityForm />
    </div>
  );
}
