'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error('Token inválido.');
      setLoading(false);
      return;
    }

    async function validateToken() {
      const response = await fetch(
        `/api/auth/validate-reset-token?token=${token}`
      );

      if (response.ok) {
        setValidToken(true);
      } else {
        toast.error('Token inválido ou expirado.');
      }

      setLoading(false);
    }

    validateToken();
  }, [token]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error('Erro ao redefinir senha.');
    }
  }

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#3B38A0]" />
      </section>
    );
  }

  if (!validToken) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">
          Token inválido. Solicite um novo link.
        </p>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-3">
      <section className="flex w-full max-w-md flex-col gap-4 rounded-md border border-[#71717b67] p-8 px-4">
        <h2 className="mx-auto text-2xl font-bold text-[#3B38A0]">TryCatch</h2>

        <p className="text-center text-sm text-zinc-500">
          Defina sua nova senha
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            label="Nova senha"
            type="password"
            placeholder="Digite sua nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full">
            Salvar nova senha
          </Button>
        </form>

        <Link href="/login" className="text-center text-sm text-zinc-500">
          Voltar para <span className="underline">login</span>
        </Link>
      </section>
    </section>
  );
}
