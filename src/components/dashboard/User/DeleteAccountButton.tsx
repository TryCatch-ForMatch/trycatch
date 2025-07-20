'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteAccountButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita!'
    );
    if (!confirmed) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const json = await res.json(); // ✅ sempre há JSON
      if (!res.ok)
        throw new Error(json.error || json.message || 'Erro ao excluir conta');

      alert(json.message || 'Conta excluída com sucesso.');
      router.push('/portfolio');
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado ao excluir conta');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-sm text-red-500 hover:underline"
      >
        {loading ? 'Excluindo...' : 'Excluir conta'}
      </button>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
