'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

//import components
import { Input } from '@/components/UI/input';
import { Button } from '@/components/UI/button';
import { Label } from '@/components/UI/label';
import { Textarea } from '@/components/UI/textarea';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  linkedin: z.string().url('LinkedIn inválido').optional().or(z.literal('')),
  github: z.string().url('GitHub inválido').optional().or(z.literal('')),
  avatar: z.string(),
  bio: z.string().optional(),
  inviteCode: z.string().min(1, 'Código do convite é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export default function UserSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      linkedin: '',
      github: '',
      avatar:
        'https://res.cloudinary.com/daxa1bpny/image/upload/v1755176016/default-avatar1_woxb42.png',
      bio: '',
      inviteCode: '',
    },
  });

  useEffect(() => {
    const email = searchParams.get('email');
    const inviteCode = searchParams.get('inviteCode');

    if (!email || !inviteCode) {
      router.push('/register');
      return;
    }

    setValue('email', email);
    setValue('inviteCode', inviteCode);
  }, [searchParams, setValue, router]);

  const onSubmit = async (data: FormData) => {
    setSubmitError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Erro ao cadastrar usuário');
      }

      setSuccess('Usuário criado com sucesso!');
      router.push('/login');
    } catch (err) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      }
    }
  };

  return (
    <section className="my-10 flex min-h-screen flex-col items-center justify-center gap-3">
      <section className="flex w-full max-w-md flex-col gap-4 rounded-md border border-[#71717b67] p-8 px-4">
        <h2 className="mx-auto text-2xl font-bold text-[#3B38A0]">
          Cadastro de Usuario
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <Input {...register('name')} label="Nome" placeholder="Seu nome" />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input {...register('email')} label="Email" disabled />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              type="password"
              label="Senha"
              placeholder="Sua senha"
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* LinkedIn e GitHub */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Input
                {...register('linkedin')}
                label="Linkedin"
                placeholder="Seu Linkedin"
              />
              {errors.linkedin && (
                <p className="text-sm text-red-500">
                  {errors.linkedin.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                {...register('github')}
                label="Github"
                placeholder="Seu github"
              />
              {errors.github && (
                <p className="text-sm text-red-500">{errors.github.message}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <Label>Bio</Label>
            <Textarea {...register('bio')} />
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          {/* Invite code (hidden) */}
          <input type="hidden" {...register('inviteCode')} />

          {/* Mensagens */}
          {submitError && (
            <p className="text-sm font-medium text-red-500">{submitError}</p>
          )}
          {success && (
            <p className="text-sm font-medium text-green-500">{success}</p>
          )}

          {/* Botão */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Cadastrando...</span>
              </span>
            ) : (
              <span>Cadastrar Usuário</span>
            )}
          </Button>
        </form>
        <Link href="/register" className="text-center text-sm text-zinc-500">
          Ja tem uma conta ? <span className="underline">Entrar</span>
        </Link>
      </section>
    </section>
  );
}
