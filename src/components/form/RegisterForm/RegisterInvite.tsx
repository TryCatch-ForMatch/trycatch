'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';

//import components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

//import icons
import { Loader2 } from 'lucide-react';

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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        const role = data?.data?.role;

        toast.success('Convite validado com sucesso! 🎉');
        router.push(
          `/signup?email=${encodeURIComponent(email)}&inviteCode=${encodeURIComponent(inviteCode)}&role=${encodeURIComponent(role)}`
        );
      } else {
        const data = await res.json();
        toast.error(data.error || 'Erro ao validar convite.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-md border border-[#71717b67] p-8 px-4">
        <h2 className="mx-auto text-2xl font-bold text-[#3B38A0]">
          Validar Convite
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
              label="Código de Convite"
              type="text"
              placeholder="Código de convite recebido por email"
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
              <span>Validar convite</span>
            )}
          </Button>
        </form>

        <Link href="/login" className="text-center text-sm text-zinc-500">
          Já tem uma conta? <span className="underline">Entrar</span>
        </Link>

        <Link href="/how-to-join" className="text-center text-sm text-zinc-500">
          Ainda não tem um código de convite?{' '}
          <span className="underline">Solicite aqui</span>
        </Link>
      </div>
    </section>
  );
}
