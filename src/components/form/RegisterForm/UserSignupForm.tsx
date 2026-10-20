'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { InputField } from '@/components/ui/input-field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getRoleLabel } from '@/lib/role-labels';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';
import { Card } from '@/components/ui/card';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  role: z.string().min(1, 'Perfil é obrigatório'),
  linkedin: z.url('LinkedIn inválido').optional().or(z.literal('')),
  github: z.url('GitHub inválido').optional().or(z.literal('')),
  avatar: z.string(),
  bio: z.string().optional(),
  inviteCode: z.string().min(1, 'Código do convite é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export default function UserSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: '',
      linkedin: '',
      github: '',
      avatar:
        'https://res.cloudinary.com/daxa1bpny/image/upload/v1755176016/default-avatar1_woxb42.png',
      bio: '',
      inviteCode: '',
    },
  });

  const selectedRole = watch('role');

  useEffect(() => {
    const email = searchParams.get('email');
    const inviteCode = searchParams.get('inviteCode');
    const role = searchParams.get('role');

    if (!email || !inviteCode) {
      router.push('/register');
      return;
    }

    setValue('email', email);
    setValue('inviteCode', inviteCode);
    setValue('role', role || 'USER');
  }, [searchParams, setValue, router]);

  const onSubmit = async (data: FormData) => {
    try {
      await apiTryCatch.post('/auth/signup', data);

      toast.success('Usuário criado com sucesso! 🎉');
      router.push('/login');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao cadastrar usuário'));
    }
  };

  return (
    <section className="my-10 flex min-h-screen flex-col items-center justify-center gap-3">
      <Card className="w-full max-w-md gap-4 px-4 py-8">
        <h1 className="mx-auto text-2xl font-bold text-primary">
          Cadastro de Usuario
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <InputField
              {...register('name')}
              label="Nome"
              placeholder="Seu nome"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <InputField {...register('email')} label="Email" disabled />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <InputField
              type="password"
              label="Senha"
              placeholder="Sua senha"
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <input type="hidden" {...register('role')} />
            <InputField
              label="Perfil"
              value={getRoleLabel(selectedRole)}
              disabled
            />
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <InputField
                {...register('linkedin')}
                label="Linkedin"
                placeholder="Seu Linkedin"
              />
              {errors.linkedin && (
                <p className="text-sm text-destructive">
                  {errors.linkedin.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <InputField
                {...register('github')}
                label="Github"
                placeholder="Seu github"
              />
              {errors.github && (
                <p className="text-sm text-destructive">
                  {errors.github.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label>Bio</Label>
            <Textarea {...register('bio')} />
            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
            )}
          </div>

          <input type="hidden" {...register('inviteCode')} />

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
        <Link
          href="/register"
          className="text-center text-sm text-muted-foreground"
        >
          Já tem uma conta ? <span className="underline">Entrar</span>
        </Link>
      </Card>
    </section>
  );
}
