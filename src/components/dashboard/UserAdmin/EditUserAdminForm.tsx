'use client';

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
import { FullUser } from '@/types/user';

const editUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  linkedin: z.string().url('URL inválida').optional().or(z.literal('')),
  github: z.string().url('URL inválida').optional().or(z.literal('')),
  bio: z.string().optional(),
  avatar: z.string().url('URL inválida').optional().or(z.literal('')),
  role: z.enum(['USER', 'ADMIN'], {
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

      onSuccess(); // atualiza a lista
      onClose(); // fecha o modal
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Nome" {...register('name')} error={errors.name?.message} />
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
      <Input
        label="Avatar (URL)"
        {...register('avatar')}
        error={errors.avatar?.message}
      />

      <div>
        <label className="text-sm font-medium">Permissão</label>
        <Select
          defaultValue={user.role}
          onValueChange={(value: 'USER' | 'ADMIN') => setValue('role', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">Usuário</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
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
  );
}
