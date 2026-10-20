'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { InputField } from '@/components/ui/input-field';
import { Button } from '@/components/ui/button';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';
import { Card } from '@/components/ui/card';

const inviteSchema = z.object({
  email: z.email({ message: 'Email inválido.' }),
  inviteCode: z.string().min(4, {
    message: 'O código do convite deve ter pelo menos 4 caracteres.',
  }),
});

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    inviteCode?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});

    const formData = { email, inviteCode };
    const validation = inviteSchema.safeParse(formData);

    if (!validation.success) {
      const errors: { email?: string; inviteCode?: string } = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0] === 'email') errors.email = err.message;
        if (err.path[0] === 'inviteCode') errors.inviteCode = err.message;
      });

      setFieldErrors(errors);
      toast.error('Preencha os campos corretamente.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await apiTryCatch.post('/auth/register', formData);
      const role = data?.data?.role;

      toast.success('Convite validado com sucesso! 🎉');
      router.push(
        `/signup?email=${encodeURIComponent(email)}&inviteCode=${encodeURIComponent(inviteCode)}&role=${encodeURIComponent(role)}`
      );
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao validar convite.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md gap-4 px-4 py-8">
        <h1 className="mx-auto text-2xl font-bold text-primary-default">
          Validar Convite
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="space-y-1">
            <InputField
              label="Email"
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {fieldErrors.email && (
              <p className="text-xs text-destructive">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <InputField
              label="Código de Convite"
              type="text"
              placeholder="Código de convite recebido por email"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              required
            />
            {fieldErrors.inviteCode && (
              <p className="text-xs text-destructive">
                {fieldErrors.inviteCode}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            variant="default"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Validando seu convite</span>
              </span>
            ) : (
              <span>Validar convite</span>
            )}
          </Button>
        </form>

        <Link
          href="/login"
          className="text-center text-sm text-muted-foreground"
        >
          Já tem uma conta? <span className="underline">Entrar</span>
        </Link>

        <Link
          href="/how-to-join"
          className="text-center text-sm text-muted-foreground"
        >
          Ainda não tem um código de convite?{' '}
          <span className="underline">Solicite aqui</span>
        </Link>
      </Card>
    </div>
  );
}
