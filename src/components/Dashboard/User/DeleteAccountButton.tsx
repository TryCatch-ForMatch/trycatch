'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';

export function DeleteAccountButton({ userId }: { userId: string }) {
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
      const { data } = await apiTryCatch.delete(`/user/${userId}`);

      toast.success(data?.message || 'Conta excluída com sucesso.');
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      setError(getApiErrorMessage(error, 'Erro ao excluir conta'));
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
