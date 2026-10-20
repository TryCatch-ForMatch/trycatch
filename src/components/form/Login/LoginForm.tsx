'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input-field';
import { Label } from '@/components/ui/label';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Loader2, Eye, EyeClosed } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <Card className="w-full max-w-md gap-4 px-4 py-8">
        <h1 className="mx-auto text-2xl font-bold text-primary-default">
          TryCatch
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Seu email"
            required
          />
          <div className="mb-4">
            <Label htmlFor="login-password" className="mb-1 block leading-5">
              Senha
            </Label>
            <InputGroup>
              <InputGroupInput
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Sua senha"
                required
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-xs"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? (
                    <Eye aria-hidden />
                  ) : (
                    <EyeClosed aria-hidden />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground transition-colors hover:text-primary-default"
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
              <span className="flex items-center justify-center gap-2 text-primary-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Entrando</span>
              </span>
            ) : (
              <span>Entrar</span>
            )}
          </Button>
        </form>

        <Link
          href="/register"
          className="text-center text-sm text-muted-foreground"
        >
          Não tem uma conta ? <span className="underline">Registrar</span>
        </Link>
      </Card>
    </div>
  );
}
