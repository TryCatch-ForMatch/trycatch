'use client';

import { UserEdit, DeleteAccountButton } from '@/components/Dashboard/User';
import { useEffect, useState } from 'react';
import { User } from '@/types/interface/user';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/user/me', { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error('Erro ao buscar usuário');
        return res.json();
      })
      .then(setUser)
      .catch((err) => {
        setError(err.message);
        toast.error(err.message); // dispara toast de erro
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
