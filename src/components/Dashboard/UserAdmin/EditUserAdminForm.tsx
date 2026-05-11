'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FullUser } from '@/types/interface/user';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ROLES, Role } from '@/lib/roles';
import { ROLE_OPTIONS } from '@/lib/role-labels';

const editUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  linkedin: z.string().url('URL inválida').optional().or(z.literal('')),
  github: z.string().url('URL inválida').optional().or(z.literal('')),
  bio: z.string().optional(),
  avatar: z.string().url('URL inválida').optional().or(z.literal('')),
  role: z.enum(Object.values(ROLES) as [Role, ...Role[]], {
    required_error: 'Selecione uma permissão',
  }),
});

type EditUserFormData = z.infer<typeof editUserSchema>;

type Props = {
  user: FullUser;
  onSuccess: () => void;
  onClose: () => void;
};

export function EditUserAdminForm({ user, onSuccess, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      linkedin: user.linkedin || '',
      github: user.github || '',
      bio: user.bio || '',
      avatar: user.avatar || '',
      role: user.role,
    },
  });

  const avatarUrl = watch('avatar');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Falha no upload do avatar');

      const json = await res.json();
      if (json.url) {
        setValue('avatar', json.url);
        toast.success('Avatar atualizado com sucesso!');
      } else {
        throw new Error('URL do avatar não retornada');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setUploadingAvatar(false);
    }
  }

  const onSubmit = async (data: EditUserFormData) => {
    try {
      const res = await fetch(`/api/user-admin/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Erro ao atualizar usuário');
      }

      toast.success('Usuário atualizado com sucesso!');
      onSuccess(); // atualiza a lista
      onClose(); // fecha o modal
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Erro ao atualizar usuário'
      );
      console.error(err);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nome"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="LinkedIn"
            {...register('linkedin')}
            error={errors.linkedin?.message}
          />
          <Input
            label="GitHub"
            {...register('github')}
            error={errors.github?.message}
          />
          <Textarea {...register('bio')} placeholder="Bio" />
          {errors.bio && (
            <p className="text-sm text-red-500">{errors.bio.message}</p>
          )}

          {/* Avatar com upload */}
          <div className="space-y-1">
            <Label>Avatar</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={uploadingAvatar}
              className="block w-full text-sm text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.avatar && (
              <p className="text-xs text-red-500">{errors.avatar.message}</p>
            )}
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Avatar Preview"
                className="mt-2 h-16 w-16 rounded-full border object-cover"
              />
            )}
            {uploadingAvatar && (
              <p className="text-sm text-gray-500">Enviando avatar...</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Perfil</label>
            <Select
              defaultValue={user.role}
              onValueChange={(value: 'USER' | 'ADMIN' | 'MENTOR') =>
                setValue('role', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            Salvar Alterações
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
