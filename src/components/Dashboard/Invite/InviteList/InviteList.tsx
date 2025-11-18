'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Pencil, Trash, X } from 'lucide-react';
import { toast } from 'sonner';
import { Invite } from '@/types/interface/invite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { AxiosError } from 'axios';
import { CardContent } from '@/components/ui/card';

const editInviteSchema = z.object({
  email: z.string().email('Email inválido'),
  role: z.enum(['USER', 'ADMIN', 'MENTOR']),
});

type EditInviteForm = z.infer<typeof editInviteSchema>;

export function InviteList() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditInviteForm>({
    resolver: zodResolver(editInviteSchema),
    defaultValues: { email: '', role: 'USER' },
  });

  const fetchInvites = async () => {
    setLoading(true);
    try {
      const res = await apiTryCatch.get('/invite');
      setInvites(res.data ?? []);
    } catch (err) {
      console.error('Erro ao carregar convites:', err);
      toast.error('Erro ao carregar convites.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  // Quando começar a editar preenche o form
  const handleEdit = (invite: Invite) => {
    setEditingId(invite.id);
    reset({ email: invite.email, role: invite.role });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset({ email: '' });
  };

  const onSaveEdit = async (data: EditInviteForm) => {
    if (!editingId) return;
    try {
      const res = await apiTryCatch.patch(`/invite/${editingId}`, {
        email: data.email,
      });

      // substitui o invite atualizado na lista
      setInvites((prev) =>
        prev.map((inv) =>
          inv.id === editingId ? { ...inv, ...res.data } : inv
        )
      );

      setEditingId(null);
      reset({ email: '' });
      toast.success('Convite atualizado com sucesso!');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const msg =
          err.response?.data?.error ||
          err.message ||
          'Erro ao atualizar convite.';

        toast.error(msg);
        return;
      }

      toast.error('Erro inesperado.');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Deseja realmente deletar este convite?');
    if (!confirmed) return;

    try {
      await apiTryCatch.delete(`/invite/${id}`);
      setInvites((prev) => prev.filter((i) => i.id !== id));
      toast.success('Convite deletado com sucesso!');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const msg =
          err.response?.data?.error ||
          err.message ||
          'Erro ao deletar convite.';
        toast.error(msg);
        return;
      }

      toast.error('Erro inesperado.');
    }
  };

  return (
    <CardContent className="mx-auto mt-6 max-w-4xl rounded-2xl shadow-md">
      <div className="space-y-4 p-6">
        <h2 className="text-xl font-semibold">Lista de Convites</h2>

        {loading && (
          <p className="text-sm text-gray-500">Carregando convites...</p>
        )}

        {!loading && invites.length === 0 && (
          <p className="text-sm text-gray-500">Nenhum convite encontrado.</p>
        )}

        {invites.map((invite) => {
          const isEditing = editingId === invite.id;
          return (
            <div
              key={invite.id}
              className="flex flex-col gap-3 p-4 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              {isEditing ? (
                <form
                  onSubmit={handleSubmit(onSaveEdit)}
                  className="flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-4"
                >
                  <div className="flex flex-col md:w-1/2">
                    <label className="text-sm text-gray-600">Email</label>
                    <Input
                      {...register('email')}
                      className="mt-1 w-full"
                      type="email"
                      placeholder="email@exemplo.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col md:w-1/3">
                    <label className="text-sm text-gray-600">Função</label>
                    <select
                      {...register('role')}
                      className="mt-1 w-full rounded-md border p-2 text-sm"
                    >
                      <option value="USER">User</option>
                      <option value="MENTOR">Mentor</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>

                  <div className="mt-2 flex gap-2 md:mt-0">
                    <Button
                      size="sm"
                      type="submit"
                      className="flex items-center gap-1"
                      disabled={isSubmitting}
                    >
                      <Check size={14} /> Salvar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="flex items-center gap-1"
                      type="button"
                    >
                      <X size={14} /> Cancelar
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between gap-4">
                      <span className="truncate font-medium">
                        {invite.email}
                      </span>
                      <span className="text-sm text-gray-600">
                        {invite.role}
                      </span>
                      <span className="text-sm text-gray-600">
                        Usado: {invite.used ? 'Sim' : 'Não'}
                      </span>
                    </div>

                    <span className="text-sm text-gray-600">
                      Código: {invite.code}
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2 md:mt-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(invite)}
                      className="flex items-center gap-1"
                    >
                      <Pencil size={14} /> Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(invite.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash size={14} /> Deletar
                    </Button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </CardContent>
  );
}
