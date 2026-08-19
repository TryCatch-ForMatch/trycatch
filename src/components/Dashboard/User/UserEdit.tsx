'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/types/interface/user';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Image from 'next/image';

const userEditFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.email('Email inválido.'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres.')
    .optional()
    .or(z.literal('')),
  avatar: z.url('URL inválida').optional().or(z.literal('')),
  linkedin: z.url('URL inválida').optional().or(z.literal('')),
  github: z.url('URL inválida').optional().or(z.literal('')),
  bio: z.string().optional(),
});

type UserEditFormValues = z.infer<typeof userEditFormSchema>;

interface UserEditProps {
  user: User;
}

export function UserEdit({ user }: UserEditProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserEditFormValues>({
    resolver: zodResolver(userEditFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: '',
      avatar: user.avatar || '',
      linkedin: user.linkedin || '',
      github: user.github || '',
      bio: user.bio || '',
    },
  });
  const avatarPreview = watch('avatar');
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
      const urlEnviada = json?.data?.url;
      if (urlEnviada) {
        setValue('avatar', urlEnviada, { shouldValidate: true });
        toast.success('Avatar atualizado com sucesso!');
      } else {
        throw new Error('Servidor não retornou a URL do avatar');
      }
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error('Erro no upload do avatar');
    } finally {
      setUploadingAvatar(false);
    }
  }

  const onSubmit = async (values: UserEditFormValues) => {
    try {
      const res = await fetch(`/api/user/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao atualizar usuário');

      toast.success('Perfil atualizado com sucesso!');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error('Erro ao atualizar usuário');
    } finally {
      //
    }
  };

  return (
    <Card className="rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <Label className="text-base font-semibold">Avatar</Label>

            {avatarPreview && (
              <Image
                src={avatarPreview}
                alt="Avatar Preview"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full border object-cover"
              />
            )}

            <label htmlFor="avatar-upload">
              <Button
                type="button"
                variant="outline"
                disabled={uploadingAvatar}
                asChild
              >
                <span>
                  {uploadingAvatar ? 'Enviando...' : 'Escolher imagem'}
                </span>
              </Button>
            </label>

            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={uploadingAvatar}
              className="hidden"
            />

            {errors.avatar && (
              <p className="text-sm text-red-500">{errors.avatar.message}</p>
            )}
          </div>

          {/* Nome */}
          <div>
            <Label>Nome</Label>
            <Input {...register('name')} aria-invalid={!!errors.name} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Email */}
            <div className="md:col-span-2">
              <Label>Email</Label>
              <Input type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Senha */}
            <div>
              <Label>Senha (opcional)</Label>
              <Input type="password" {...register('password')} />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* LinkedIn & GitHub */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label>LinkedIn</Label>
              <Input {...register('linkedin')} />
              {errors.linkedin && (
                <p className="text-sm text-red-500">
                  {errors.linkedin.message}
                </p>
              )}
            </div>
            <div>
              <Label>GitHub</Label>
              <Input {...register('github')} />
              {errors.github && (
                <p className="text-sm text-red-500">{errors.github.message}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label>Bio</Label>
            <Textarea {...register('bio')} className="min-h-[150px] resize-y" />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
