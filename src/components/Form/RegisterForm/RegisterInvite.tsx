'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

//import components
import { Input } from '@/components/UI/input';
import { Button } from '@/components/UI/button';

//import icons
import { Loader2 } from 'lucide-react';

const inviteSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }),
  inviteCode: z.string().min(4, {
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

    //// Verificacao pendente
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
    <section className="flex min-h-screen items-center justify-center">
      {formError && (
        <div className="mx-auto text-center text-sm font-medium text-red-500">
          {formError}
        </div>
      )}

      <div className="flex w-full max-w-md flex-col gap-4 rounded-md border border-[#71717b67] p-8 px-4">
        <h2 className="mx-auto text-2xl font-bold text-[#3B38A0]">
          Registre seu Convite
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="space-y-1">
            <Input
              label="Email"
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
              label="Codigo de Convite"
              type="text"
              placeholder="Seu codigo de convite"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              required
            />
            {fieldErrors.inviteCode && (
              <p className="text-xs text-red-500">{fieldErrors.inviteCode}</p>
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
              <span>Validar o convite</span>
            )}
          </Button>
        </form>

        <Link href="/login" className="text-center text-sm text-zinc-500">
          Ja tem uma conta ? <span className="underline">Entrar</span>
        </Link>
      </div>
    </section>
  );
}
