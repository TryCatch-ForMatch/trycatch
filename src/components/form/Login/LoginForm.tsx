'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'sonner';

//import components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

//import icons
import { Loader2 } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.ok) {
        toast.success('Login realizado com sucesso! 🚀');
        router.push('/dashboard');
      } else {
        toast.error('E-mail ou senha inválidos ❌');
      }
    } catch (error) {
      toast.error('Ocorreu um erro, tente novamente!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-3">
      <section className="flex w-full max-w-md flex-col gap-4 rounded-md border border-[#71717b67] p-8 px-4">
        <h2 className="mx-auto text-2xl font-bold text-[#3B38A0]">TryCatch</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Seu email"
            required
          />

          <Input
            label="Senha"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Sua senha"
            required
          />

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-xs text-zinc-500 transition-colors hover:text-[#3B38A0]"
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2 text-gray-50">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Entrando</span>
              </span>
            ) : (
              <span>Entrar</span>
            )}
          </Button>
        </form>

        <Link href="/register" className="text-center text-sm text-zinc-500">
          Não tem uma conta ? <span className="underline">Registrar</span>
        </Link>
      </section>
    </section>
  );
}
