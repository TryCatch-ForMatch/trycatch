'use client';

import { ConfirmModal } from '@/components/ui/modal';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';

export function DeleteAccountButton({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setConfirmOpen(false);
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
      <Button
        type="button"
        variant="link"
        onClick={() => setConfirmOpen(true)}
        disabled={loading}
        className="h-auto p-0 text-destructive"
      >
        {loading ? 'Excluindo...' : 'Excluir conta'}
      </Button>
      {error && (
        <p role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}

      <ConfirmModal
        destructive
        open={confirmOpen}
        title="Excluir conta"
        description="Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita!"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
