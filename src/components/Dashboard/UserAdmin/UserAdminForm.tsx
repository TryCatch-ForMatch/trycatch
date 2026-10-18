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
import { SkillTag } from '@/components/shared/SkillSelector';
import { Skill } from '@prisma/client';
import { toast } from 'sonner';
import { ROLES, Role } from '@/lib/roles';
import { ROLE_OPTIONS } from '@/lib/role-labels';
import Image from 'next/image';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';

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
        const { data } = await apiTryCatch.get<Skill[]>('/skill');
        setSkills(data);
      } catch (error) {
        toast.error(getApiErrorMessage(error, 'Erro ao carregar as skills.'));
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

      const { data: json } = await apiTryCatch.post(
        '/upload/avatar',
        formDataUpload
      );

      const urlEnviada = json?.data?.url;
      if (urlEnviada) {
        setValue('avatar', urlEnviada);
      } else {
        toast.error('URL do avatar não retornada');
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Falha no upload do avatar'));
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
      await apiTryCatch.post('/user-admin', data);

      toast.success('Usuário criado com sucesso!');
      reset();
      router.refresh();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao cadastrar usuário.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-1 max-w-4xl rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <Label>Nome</Label>
            <Input {...register('name')} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" {...register('email')} />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
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
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>LinkedIn</Label>
              <Input {...register('linkedin')} />
              {errors.linkedin && (
                <p className="text-xs text-destructive">
                  {errors.linkedin.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>GitHub</Label>
              <Input {...register('github')} />
              {errors.github && (
                <p className="text-xs text-destructive">
                  {errors.github.message}
                </p>
              )}
            </div>
          </div>

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
                  <SkillTag
                    key={skillId}
                    id={skillId}
                    name={skill?.name || skillId}
                    onRemove={handleRemoveSkill}
                  />
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <Label>Bio</Label>
            <Textarea {...register('bio')} />
          </div>

          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Avatar</Label>
              <input
                type="file"
                accept="image/*"
                title="input file"
                onChange={handleAvatarChange}
                disabled={uploadingAvatar}
                className="block w-full text-sm text-foreground file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-secondary-foreground hover:file:bg-secondary/80"
              />
              {errors.avatar && (
                <p className="text-xs text-destructive">
                  {errors.avatar.message}
                </p>
              )}

              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="Avatar Preview"
                  className="mt-2 h-16 w-16 rounded-full border object-cover"
                />
              )}
              {uploadingAvatar && (
                <p className="text-sm text-muted-foreground">
                  Enviando avatar...
                </p>
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
                <p className="text-xs text-destructive">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

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
