'use client';

import { UserEdit, DeleteAccountButton } from '@/components/Dashboard/User';
import { useEffect, useState } from 'react';
import { User } from '@/types/interface/user';
import { toast } from 'sonner';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiTryCatch
      .get<User>('/user/me')
      .then(({ data }) => setUser(data))
      .catch((err) => {
        const message = getApiErrorMessage(err, 'Erro ao buscar usuário');
        setError(message);
        toast.error(message);
      });
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Carregando perfil...</p>;

  return (
    <div className="relative mx-auto mt-6 max-w-md md:max-w-2xl lg:max-w-4xl">
      <DeleteAccountButton userId={user.id} />

      <h1 className="mb-4 text-2xl font-bold">Meu Perfil</h1>
      <UserEdit user={user} />
    </div>
  );
}
