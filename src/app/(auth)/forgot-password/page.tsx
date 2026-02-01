'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

// components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// icons
import { Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      toast.success(data.message);
    } catch {
      toast.error('Erro ao enviar e-mail. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-3">
      <section className="flex w-full max-w-md flex-col gap-4 rounded-md border border-[#71717b67] p-8 px-4">
        <h2 className="mx-auto text-2xl font-bold text-[#3B38A0]">TryCatch</h2>

        <p className="text-center text-sm text-zinc-500">
          Informe seu e-mail para redefinir sua senha
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            label="Email"
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2 text-gray-50">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Enviando</span>
              </span>
            ) : (
              <span>Enviar link</span>
            )}
          </Button>
        </form>

        <Link href="/login" className="text-center text-sm text-zinc-500">
          Voltar para <span className="underline">login</span>
        </Link>
      </section>
    </section>
  );
}
