'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { toast } from 'sonner';
import { ROLES, Role } from '@/lib/roles';
import { ROLE_OPTIONS } from '@/lib/role-labels';
import Image from 'next/image';

const userAdminSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  avatar: z.url('URL inválida').optional().or(z.literal('')),
  linkedin: z.url('URL inválida').optional().or(z.literal('')),
  github: z.url('URL inválida').optional().or(z.literal('')),
  bio: z.string().optional(),
  role: z.enum(Object.values(ROLES) as [Role, ...Role[]]),
  skills: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof userAdminSchema>;

export function UserAdminForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(userAdminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      avatar: '',
      linkedin: '',
      github: '',
      bio: '',
      role: 'USER',
      skills: [],
    },
  });

  const avatarUrl = watch('avatar');
  const selectedSkills = watch('skills');
  const selectedRole = watch('role');

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/skill');
        if (!res.ok) throw new Error('Erro ao carregar as skills.');
        const data = await res.json();
        setSkills(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Erro desconhecido.'
        );
      }
    };
    fetchSkills();
  }, []);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const res = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!res.ok) throw new Error('Falha no upload do avatar');

      const json = await res.json();
      if (json.url) {
        setValue('avatar', json.url); // Atualiza o campo avatar no hook form
      } else {
        toast.error('URL do avatar não retornada');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setUploadingAvatar(false);
    }
  }

  const handleAddSkill = (skillId: string) => {
    const currentSkills = watch('skills') ?? [];
    if (!currentSkills.includes(skillId)) {
      setValue('skills', [...currentSkills, skillId]);
    }
  };

  const handleRemoveSkill = (skillId: string) => {
    const currentSkills = watch('skills') ?? [];
    setValue(
      'skills',
      currentSkills.filter((id) => id !== skillId)
    );
  };

  const availableSkills = skills.filter(
    (skill) => !selectedSkills?.includes(skill.id)
  );

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const res = await fetch('/api/user-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Erro ao cadastrar usuário.');
      }

      toast.success('Usuário criado com sucesso!');
      reset(); // limpa todos os campos
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro desconhecido.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-1 max-w-4xl rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Nome */}
          <div className="space-y-1">
            <Label>Nome</Label>
            <Input {...register('name')} />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email e Senha */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" {...register('email')} />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
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
                <p className="text-xs text-red-500">
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
                <p className="text-xs text-red-500">
                  {errors.linkedin.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>GitHub</Label>
              <Input {...register('github')} />
              {errors.github && (
                <p className="text-xs text-red-500">{errors.github.message}</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-1">
            <Label>Skills</Label>
            <Select onValueChange={handleAddSkill} value="">
              <SelectTrigger className="w-full">
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

            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSkills?.map((skillId) => {
                const skill = skills.find((s) => s.id === skillId);
                return (
                  <span
                    key={skillId}
                    className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-xs"
                  >
                    {skill?.name || skillId}
                    <button
                      title="button name"
                      type="button"
                      onClick={() => handleRemoveSkill(skillId)}
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
          </div>

          {/* Avatar e Permissão */}
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Avatar</Label>
              <input
                type="file"
                accept="image/*"
                title="input file"
                onChange={handleAvatarChange}
                disabled={uploadingAvatar}
                className="block w-full text-sm text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {errors.avatar && (
                <p className="text-xs text-red-500">{errors.avatar.message}</p>
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

            <div className="space-y-1">
              <Label>Perfil</Label>
              <Select
                value={selectedRole}
                onValueChange={(value: 'USER' | 'ADMIN' | 'MENTOR') =>
                  setValue('role', value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a permissão" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-xs text-red-500">{errors.role.message}</p>
              )}
            </div>
          </div>

          {/* Mensagens de erro/sucesso */}
          <div className="space-y-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Cadastrando...' : 'Cadastrar Usuário'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
