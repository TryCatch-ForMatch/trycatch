'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Pencil, Trash, X } from 'lucide-react';
import { toast } from 'sonner';
import { Invite } from '@/types/interface/invite';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { RoleBadge } from '@/components/ui/role-badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROLE_OPTIONS } from '@/lib/role-labels';

const editInviteSchema = z.object({
  email: z.email('Email inválido'),
  role: z.enum(['USER', 'ADMIN', 'MENTOR']),
});

type EditInviteForm = z.infer<typeof editInviteSchema>;

export function InviteList() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const {
    register,
    control,
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
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao carregar convites.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

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
        role: data.role,
      });

      setInvites((prev) =>
        prev.map((inv) =>
          inv.id === editingId ? { ...inv, ...res.data } : inv
        )
      );

      setEditingId(null);
      reset({ email: '' });
      toast.success('Convite atualizado com sucesso!');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao atualizar convite.'));
    }
  };

  const confirmDelete = async () => {
    const id = pendingDeleteId;
    if (!id) return;
    setPendingDeleteId(null);

    try {
      await apiTryCatch.delete(`/invite/${id}`);
      setInvites((prev) => prev.filter((i) => i.id !== id));
      toast.success('Convite deletado com sucesso!');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao deletar convite.'));
    }
  };

  return (
    <CardContent className="mx-auto mt-6 max-w-4xl rounded-2xl shadow-md">
      <div className="space-y-4 p-6">
        <h2 className="text-xl font-semibold">Lista de Convites</h2>

        {loading && (
          <p className="text-sm text-muted-foreground">
            Carregando convites...
          </p>
        )}

        {!loading && invites.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhum convite encontrado.
          </p>
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
                    <Label
                      htmlFor={`invite-email-${invite.id}`}
                      className="text-muted-foreground"
                    >
                      Email
                    </Label>
                    <Input
                      id={`invite-email-${invite.id}`}
                      {...register('email')}
                      className="mt-1 w-full"
                      type="email"
                      placeholder="email@exemplo.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col md:w-1/3">
                    <Label
                      htmlFor={`invite-role-${invite.id}`}
                      className="text-muted-foreground"
                    >
                      Perfil
                    </Label>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id={`invite-role-${invite.id}`}
                            className="mt-1 w-full"
                          >
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLE_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="mt-2 flex gap-2 md:mt-0">
                    <Button
                      size="sm"
                      type="submit"
                      className="flex items-center gap-1"
                      disabled={isSubmitting}
                    >
                      <Check aria-hidden size={14} /> Salvar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="flex items-center gap-1"
                      type="button"
                    >
                      <X aria-hidden size={14} /> Cancelar
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
                      <RoleBadge role={invite.role} />
                      <span className="text-sm text-muted-foreground">
                        Usado: {invite.used ? 'Sim' : 'Não'}
                      </span>
                    </div>

                    <span className="text-sm text-muted-foreground">
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
                      <Pencil aria-hidden size={14} /> Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setPendingDeleteId(invite.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash aria-hidden size={14} /> Deletar
                    </Button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Deletar convite"
        description="Deseja realmente deletar este convite?"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </CardContent>
  );
}
