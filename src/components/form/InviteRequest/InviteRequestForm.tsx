'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { AxiosError } from 'axios';

const inviteRequestSchema = z.object({
  name: z.string().min(3, 'Informe seu nome completo'),
  email: z.string().email('Informe um email válido'),
  linkedin: z
    .string()
    .url('Informe uma URL válida')
    .refine(
      (url) =>
        url.startsWith('https://www.linkedin.com/') ||
        url.startsWith('https://linkedin.com/'),
      'Informe um perfil válido do LinkedIn'
    ),
  role: z.enum(['USER', 'MENTOR']),
});

type InviteRequestFormData = z.infer<typeof inviteRequestSchema>;

type InviteRequestFormProps = {
  defaultRole?: InviteRequestFormData['role'];
};

export function InviteRequestForm({
  defaultRole = 'USER',
}: InviteRequestFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteRequestFormData>({
    resolver: zodResolver(inviteRequestSchema),
    defaultValues: {
      role: defaultRole,
    },
  });

  async function onSubmit(data: InviteRequestFormData) {
    setLoading(true);

    try {
      await apiTryCatch.post('/invite-request', data);
      toast.success(
        'Solicitação enviada com sucesso! Em breve entraremos em contato por email.'
      );
      reset();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message || 'Não foi possível enviar sua solicitação');
      } else {
        toast.error('Não foi possível enviar sua solicitação');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-3 rounded-md border border-[#71717b67] p-6"
    >
      <Input
        label="Nome completo"
        placeholder="Ex: Maria Silva"
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        label="Email"
        type="email"
        placeholder="exemplo@email.com"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="LinkedIn"
        placeholder="https://www.linkedin.com/in/seuperfil"
        {...register('linkedin')}
        error={errors.linkedin?.message}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm">Perfil desejado</label>
        <select
          {...register('role')}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="USER">Membro (em início de carreira)</option>
          <option value="MENTOR">Mentor (profissional experiente)</option>
        </select>
        {errors.role && (
          <span className="text-xs text-red-500">{errors.role.message}</span>
        )}
      </div>

      <Button type="submit" disabled={loading} className="mt-2">
        {loading ? 'Enviando...' : 'Enviar solicitação'}
      </Button>
    </form>
  );
}
