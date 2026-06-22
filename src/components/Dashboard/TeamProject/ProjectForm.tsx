'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ProjectDetailsType } from '@/types/interface/team-project';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProjectStackSelector } from './ProjectStackSelector';
import { ProjectSkillSelector } from './ProjectSkillSelector';
import { useCurrentUser } from '@/lib/use-current-user';
import { toast } from 'sonner';
import { MoneyInput } from '@/components/form/MoneyInput/MoneyInput';

const projectSchema = z.object({
  name: z.string().min(3, 'Nome do projeto é obrigatório'),
  description: z
    .string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  deadline: z.string().refine(
    (val) => {
      const date = new Date(val);
      const now = new Date();
      return !isNaN(date.getTime()) && date > now;
    },
    { message: 'Data deve ser válida e futura' }
  ),
  totalValue: z.number().min(0, 'Valor total deve ser maior ou igual a 0'),
  github: z.string().url('URL inválida').optional().or(z.literal('')),
  stacks: z
    .array(
      z.object({
        stackId: z.string().min(1, 'Selecione uma stack'),
        percentage: z.number().min(1).max(100),
      })
    )
    .min(1, 'Selecione pelo menos uma stack')
    .refine((arr) => arr.reduce((sum, s) => sum + s.percentage, 0) === 100, {
      message: 'A soma dos percentuais deve ser 100%',
    }),
  skills: z
    .array(z.string().min(1, 'Selecione ao menos uma skill'))
    .min(1, 'Selecione ao menos uma skill'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export function ProjectForm({ editIdProp }: { editIdProp?: string } = {}) {
  const router = useRouter();
  const user = useCurrentUser();
  const searchParams = useSearchParams();
  const editIdParam = searchParams?.get('edit') || null;
  const editId = editIdProp ?? editIdParam;
  const [editingProject, setEditingProject] =
    useState<ProjectDetailsType | null>(null);

  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      deadline: '',
      totalValue: 0,
      github: '',
      stacks: [{ stackId: '', percentage: 0 }],
      skills: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit: (data: ProjectFormData) => Promise<void> = async (data) => {
    if (!user) {
      toast.error('Você precisa estar logado para criar um projeto.');
      return;
    }

    try {
      const payload = {
        name: data.name,
        description: data.description,
        deadline: data.deadline,
        totalValue: data.totalValue,
        github: data.github,
        status: editingProject ? editingProject.status : 'BUSCANDO',
        skills: data.skills,
        stacks: data.stacks,
      };

      console.log('Payload enviado:', payload);

      let res: Response;
      if (editId) {
        res = await fetch(`/api/team-project/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/team-project', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        console.error('Erro da API:', error);
        throw new Error(
          editId ? 'Erro ao atualizar projeto' : 'Erro ao criar projeto'
        );
      }

      router.push(
        editId
          ? `/dashboard/team-projects/${editId}`
          : '/dashboard/team-projects'
      );
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar projeto');
    }
  };

  // Fetch project data when editing
  useEffect(() => {
    async function loadProject() {
      if (!editId) return;
      try {
        const res = await fetch(`/api/team-project/${editId}`);
        if (!res.ok) throw new Error('Não foi possível buscar projeto');
        const data = (await res.json()) as ProjectDetailsType;
        setEditingProject(data);
        methods.reset({
          name: data.name || '',
          description: data.description || '',
          deadline: data.deadline ? data.deadline.split('T')[0] : '',
          totalValue: data.totalValue ?? 0,
          github: data.github ?? '',
          stacks: (data.stacks || []).map((s) => ({
            stackId: s.stackId,
            percentage: s.percentage,
          })),
          skills: (data.skills || []).map((s) => s.id),
        });
      } catch (error) {
        console.error(error);
        toast.error('Erro ao carregar dados do projeto para edição');
      }
    }
    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-5 mx-auto grid max-w-5xl grid-cols-1 gap-6 p-6 md:grid-cols-2"
      >
        {/* Coluna Esquerda */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nome</label>
            <Input placeholder="Nome do projeto" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <ProjectSkillSelector />
            {errors.skills && (
              <p className="text-sm text-red-500">{errors.skills.message}</p>
            )}
          </div>

          <div>
            <ProjectStackSelector />
            {errors.stacks && (
              <p className="text-sm text-red-500">
                {'message' in errors.stacks ? errors.stacks.message : ''}
              </p>
            )}
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="mr-8 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Descrição</label>
            <Textarea
              className="h-69 break-all"
              placeholder="Descreva o projeto"
              rows={5}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              GitHub (opcional)
            </label>
            <Input
              placeholder="https://github.com/usuario/repositorio"
              {...register('github')}
            />
            {errors.github && (
              <p className="text-sm text-red-500">{errors.github.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">Prazo</label>
              <Input type="date" {...register('deadline')} />
              {errors.deadline && (
                <p className="text-sm text-red-500">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">
                Valor (R$)
              </label>
              <MoneyInput name="totalValue" control={methods.control} />

              {errors.totalValue && (
                <p className="text-sm text-red-500">
                  {'message' in errors.totalValue
                    ? errors.totalValue.message
                    : ''}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Salvando...' : 'Salvar Projeto'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
