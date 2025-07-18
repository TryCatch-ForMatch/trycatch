'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { Skill } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  linkedin: z.string().url('LinkedIn inválido').optional().or(z.literal('')),
  github: z.string().url('GitHub inválido').optional().or(z.literal('')),
  avatar: z.string().url('URL inválida').optional().or(z.literal('')),
  bio: z.string().optional(),
  skills: z.array(z.string(), {
    required_error: 'Selecione ao menos uma skill',
  }),
  inviteCode: z.string().min(1, 'Código do convite é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export default function UserSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState('');

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
      linkedin: '',
      github: '',
      avatar: '',
      bio: '',
      skills: [],
      inviteCode: '',
    },
  });

  const selectedSkills = watch('skills');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/skill');
        if (!res.ok) throw new Error('Erro ao carregar as skills.');
        const data = await res.json();
        setSkills(data);
      } catch (error) {
        console.error('Erro ao buscar skills:', error);
      }
    };
    fetchSkills();
  }, []);

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

  const availableSkills = skills.filter((s) => !selectedSkills.includes(s.id));

  return (
    <Card className="mx-auto mt-1 max-w-4xl rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Nome */}
          <div className="space-y-1">
            <Label>Nome</Label>
            <Input {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email e Senha */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input {...register('email')} disabled />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Senha</Label>
              <Input
                type="password"
                autoComplete="new-password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* LinkedIn e GitHub */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>LinkedIn</Label>
              <Input {...register('linkedin')} />
              {errors.linkedin && (
                <p className="text-sm text-red-500">
                  {errors.linkedin.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>GitHub</Label>
              <Input {...register('github')} />
              {errors.github && (
                <p className="text-sm text-red-500">{errors.github.message}</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-1">
            <Label>Skills</Label>
            <Select
              onValueChange={(value: string) => {
                if (!selectedSkills.includes(value)) {
                  setValue('skills', [...selectedSkills, value]);
                }
              }}
              value=""
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma skill" />
              </SelectTrigger>
              <SelectContent>
                {availableSkills.map((skill) => (
                  <SelectItem key={skill.id} value={skill.id}>
                    {skill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.skills && (
              <p className="text-sm text-red-500">{errors.skills.message}</p>
            )}

            {/* Listagem das skills selecionadas */}
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSkills.map((skillId: string) => {
                const skill = skills.find((s) => s.id === skillId);
                return (
                  <span
                    key={skillId}
                    className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-xs"
                  >
                    {skill?.name || skillId}
                    <button
                      type="button"
                      onClick={() =>
                        setValue(
                          'skills',
                          selectedSkills.filter((id) => id !== skillId)
                        )
                      }
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                );
              })}
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

          {/* Avatar */}
          <div className="space-y-1">
            <Label>Avatar (URL)</Label>
            <Input {...register('avatar')} />
            {errors.avatar && (
              <p className="text-sm text-red-500">{errors.avatar.message}</p>
            )}
            {watch('avatar') && (
              <img
                src={watch('avatar')}
                alt="Avatar Preview"
                className="mt-2 h-16 w-16 rounded-full border object-cover"
              />
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

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Usuário'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
