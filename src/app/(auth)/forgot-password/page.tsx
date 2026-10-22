'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input-field';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';
import { Card } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await apiTryCatch.post('/auth/forgot-password', {
        email,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, 'Erro ao enviar e-mail. Tente novamente.')
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-3">
      <Card className="w-full max-w-md gap-4 px-4 py-8">
        <h1 className="mx-auto text-2xl font-bold text-primary">TryCatch</h1>

        <p className="text-center text-sm text-muted-foreground">
          Informe seu e-mail para redefinir sua senha
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <InputField
            label="Email"
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2 text-primary-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Enviando</span>
              </span>
            ) : (
              <span>Enviar link</span>
            )}
          </Button>
        </form>

        <Link
          href="/login"
          className="text-center text-sm text-muted-foreground"
        >
          Voltar para <span className="underline">login</span>
        </Link>
      </Card>
    </section>
  );
}
