'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/ui/input-field';
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
import Image from 'next/image';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';

const editUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('Email inválido'),
  linkedin: z.url('URL inválida').optional().or(z.literal('')),
  github: z.url('URL inválida').optional().or(z.literal('')),
  bio: z.string().optional(),
  avatar: z.url('URL inválida').optional().or(z.literal('')),
  role: z.enum(Object.values(ROLES) as [Role, ...Role[]], {
    error: 'Selecione uma permissão',
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

      const { data: json } = await apiTryCatch.post('/upload/avatar', formData);

      const urlEnviada = json?.data?.url;
      if (urlEnviada) {
        setValue('avatar', urlEnviada);
        toast.success('Avatar atualizado com sucesso!');
      } else {
        toast.error('URL do avatar não retornada');
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Falha no upload do avatar'));
    } finally {
      setUploadingAvatar(false);
    }
  }

  const onSubmit = async (data: EditUserFormData) => {
    try {
      await apiTryCatch.put(`/user-admin/${user.id}`, data);

      toast.success('Usuário atualizado com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao atualizar usuário'));
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Nome"
            {...register('name')}
            error={errors.name?.message}
          />
          <InputField
            label="Email"
            {...register('email')}
            error={errors.email?.message}
          />
          <InputField
            label="LinkedIn"
            {...register('linkedin')}
            error={errors.linkedin?.message}
          />
          <InputField
            label="GitHub"
            {...register('github')}
            error={errors.github?.message}
          />
          <Textarea {...register('bio')} placeholder="Bio" />
          {errors.bio && (
            <p className="text-sm text-destructive">{errors.bio.message}</p>
          )}

          <div className="space-y-1">
            <Label htmlFor="edit-user-avatar">Avatar</Label>
            <Input
              id="edit-user-avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={uploadingAvatar}
            />
            {errors.avatar && (
              <p className="text-xs text-destructive">
                {errors.avatar.message}
              </p>
            )}
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt="Avatar Preview"
                className="mt-2 h-16 w-16 rounded-full border object-cover"
              />
            )}
            {uploadingAvatar && (
              <p className="text-sm text-muted-foreground">
                Enviando avatar...
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="edit-user-role">Perfil</Label>
            <Select
              defaultValue={user.role}
              onValueChange={(value: 'USER' | 'ADMIN' | 'MENTOR') =>
                setValue('role', value)
              }
            >
              <SelectTrigger id="edit-user-role">
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
              <p className="text-sm text-destructive">{errors.role.message}</p>
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
