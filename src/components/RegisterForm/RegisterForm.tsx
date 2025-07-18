'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const inviteSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }),
  inviteCode: z
    .string()
    .min(4, {
      message: 'O código do convite deve ter pelo menos 4 caracteres.',
    }),
});

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    inviteCode?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    setFieldErrors({});

    const formData = { email, inviteCode };

    const validation = inviteSchema.safeParse(formData);

    if (!validation.success) {
      const errors: { email?: string; inviteCode?: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0] === 'email') errors.email = err.message;
        if (err.path[0] === 'inviteCode') errors.inviteCode = err.message;
      });

      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push(
          `/signup?email=${encodeURIComponent(email)}&inviteCode=${encodeURIComponent(inviteCode)}`
        );
      } else {
        const data = await res.json();
        setFormError(data.error || 'Erro ao validar convite.');
      }
    } catch (error) {
      console.log(error);
      setFormError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Registro com Convite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="text-center text-sm font-medium text-red-500">
                {formError}
              </div>
            )}

            <div className="space-y-1">
              <Input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-500">{fieldErrors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                type="text"
                placeholder="Código do convite"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                required
              />
              {fieldErrors.inviteCode && (
                <p className="text-xs text-red-500">{fieldErrors.inviteCode}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Validando...' : 'Validar Convite'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
