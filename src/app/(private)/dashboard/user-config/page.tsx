'use cliente';

import { UserAvailabilityForm } from '@/components/dashboard/User';

export default function UserConfigPage() {
  return (
    <div className="relative mx-auto mt-6 max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">Configurações do Usuário</h1>
      <UserAvailabilityForm />
    </div>
  );
}
