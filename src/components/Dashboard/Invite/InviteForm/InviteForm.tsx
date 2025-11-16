'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const inviteSchema = z.object({
  email: z.string().email('E-mail inválido'),
  role: z.enum(['USER', 'ADMIN', 'MENTOR']),
});

type InviteSchema = z.infer<typeof inviteSchema>;

export function InviteForm() {
  const [loading, setLoading] = useState(false);

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

  const email = watch('email');
  const role = watch('role');

  const onSubmit = async (data: InviteSchema) => {
    setLoading(true);

    try {
      const response = await apiTryCatch.post('/invite', data);
      const result = response.data;

      if (response.status === 201) {
        toast.success(`Código de convite gerado: ${result.data.code}`);
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

  return (
    <Card className="mx-auto mt-4 max-w-md rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Criar Convite</h2>

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

          {/* Role */}
          <div className="space-y-1">
            <Label htmlFor="role">Função</Label>
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
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="MENTOR">Mentor</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
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
      </CardContent>
    </Card>
  );
}
