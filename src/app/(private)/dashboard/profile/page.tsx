'use client';

import { UserEdit, DeleteAccountButton } from '@/components/dashboard/User';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

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
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Carregando perfil...</p>;

  return (
    <div className="relative mx-auto mt-6 max-w-2xl">
      <DeleteAccountButton userId={user.id} />

      <h1 className="mb-4 text-2xl font-bold">Meu Perfil</h1>
      <UserEdit user={user} />
    </div>
  );
}
