'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { ROLE_OPTIONS } from '@/lib/role-labels';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const inviteSchema = z.object({
  email: z.string().email('E-mail inválido'),
  role: z.enum(['USER', 'ADMIN', 'MENTOR']),
});

type InviteSchema = z.infer<typeof inviteSchema>;

export function InviteForm() {
  const [loading, setLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState<string | null>(null);

  const form = useForm<InviteSchema>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      role: 'USER',
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const role = watch('role');

  const onSubmit = async (data: InviteSchema) => {
    setLoading(true);

    try {
      const response = await apiTryCatch.post('/invite', data);
      const result = response.data;

      if (response.status === 201) {
        const code = result.data.code;

        setInviteCode(code); // salva o código ao criar
        toast.success('Código de convite gerado!');
        reset();
      } else {
        toast.error(result.error || 'Erro ao criar convite.');
      }
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      toast.error('Erro na requisição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!inviteCode) return;

    navigator.clipboard.writeText(inviteCode);
    toast.success('Código copiado!');
  };

  return (
    <div className="mt-4 w-full rounded-2xl bg-white p-6 shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email">E-mail do convidado</Label>
          <Input
            id="email"
            type="email"
            placeholder="nome@email.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Perfil */}
        <div className="space-y-1">
          <Label htmlFor="role">Perfil</Label>
          <Select
            value={role}
            onValueChange={(value) =>
              setValue('role', value as 'USER' | 'ADMIN' | 'MENTOR')
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
            <p className="text-xs text-red-500">{errors.role.message}</p>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Enviando...' : 'Criar Convite'}
        </Button>
      </form>

      {/* Exibir o código criado */}
      {inviteCode && (
        <div className="mt-6 rounded-xl border bg-gray-100 p-4">
          <p className="mb-2 text-sm font-medium">Código de convite criado:</p>

          <div className="flex items-center gap-2">
            <span className="flex-1 rounded-md border bg-white px-3 py-2 font-mono text-lg tracking-wide">
              {inviteCode}
            </span>

            <Button onClick={copyToClipboard} variant="secondary">
              Copiar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
