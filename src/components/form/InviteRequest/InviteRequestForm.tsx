'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input-field';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { AxiosError } from 'axios';
import { Card } from '@/components/ui/card';

const inviteRequestSchema = z.object({
  name: z.string().min(3, 'Informe seu nome completo'),
  email: z.email('Informe um email válido'),
  linkedin: z
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
    control,
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
    <Card className="w-full max-w-md p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <InputField
          label="Nome completo"
          placeholder="Ex: Maria Silva"
          {...register('name')}
          error={errors.name?.message}
        />

        <InputField
          label="Email"
          type="email"
          placeholder="exemplo@email.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <InputField
          label="LinkedIn"
          placeholder="https://www.linkedin.com/in/seuperfil"
          {...register('linkedin')}
          error={errors.linkedin?.message}
        />

        <div className="flex flex-col gap-1">
          <Label htmlFor="invite-request-role" className="font-normal">
            Perfil desejado
          </Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="invite-request-role" className="h-10 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">
                    Membro (em início de carreira)
                  </SelectItem>
                  <SelectItem value="MENTOR">
                    Mentor (profissional experiente)
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <span className="text-xs text-destructive">
              {errors.role.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={loading} className="mt-2">
          {loading ? 'Enviando...' : 'Enviar solicitação'}
        </Button>
      </form>
    </Card>
  );
}
