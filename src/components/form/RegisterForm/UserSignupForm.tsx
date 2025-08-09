'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { X, Loader2 } from 'lucide-react';
import { Skill } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

//import components
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

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
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

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
  const avatarUrl = watch('avatar');

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setSubmitError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Falha no upload do avatar');

      const json = await res.json();
      if (json.url) {
        setValue('avatar', json.url); // ✅ Atualiza direto no RHF
      } else {
        throw new Error('Servidor não retornou a URL do avatar');
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setUploadingAvatar(false);
    }
  }

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
    <section className="my-10 flex min-h-screen flex-col items-center justify-center gap-3">
      <section className="flex w-full max-w-md flex-col gap-4 rounded-md p-8 px-4 shadow-sm">
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

            {/* Skills selecionadas */}
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
                          selectedSkills.filter((id: string) => id !== skillId)
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
            <Label>Avatar</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={uploadingAvatar}
              className="block w-full cursor-pointer text-sm text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.avatar && (
              <p className="text-sm text-red-500">{errors.avatar.message}</p>
            )}
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt="Avatar Preview"
                className="mt-2 h-16 w-16 rounded-full border object-cover"
              />
            )}
            {uploadingAvatar && (
              <p className="text-sm text-gray-500">Enviando avatar...</p>
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
      </section>
    </section>
  );
}
