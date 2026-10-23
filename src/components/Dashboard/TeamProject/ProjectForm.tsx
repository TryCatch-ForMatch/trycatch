'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ProjectDetailsType } from '@/types/interface/team-project';
import {
  useForm,
  Controller,
  FormProvider,
  type FieldErrors,
} from 'react-hook-form';
import { addDays, addYears, format, parse } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input-field';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { ProjectStackSelector } from './ProjectStackSelector';
import { SkillSelector } from '@/components/shared/SkillSelector';
import { useWatch } from 'react-hook-form';
import { useCurrentUser } from '@/lib/use-current-user';
import { toast } from 'sonner';
import { MoneyInput } from '@/components/form/MoneyInput/MoneyInput';
import { getStackAssignmentLabel } from '@/lib/stack-assignment';
import { isAxiosError } from 'axios';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { useInvalidateProjects } from '@/hooks/api/useProjects';

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
  const invalidateProjects = useInvalidateProjects();
  const user = useCurrentUser();
  const editId = editIdProp;
  const [editingProject, setEditingProject] =
    useState<ProjectDetailsType | null>(null);
  const [stackAssignments, setStackAssignments] = useState<
    Record<string, string>
  >({});

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

  const selectedSkills =
    useWatch({
      control: methods.control,
      name: 'skills',
    }) ?? [];

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

      if (editId) {
        await apiTryCatch.put(`/team-project/${editId}`, payload);
      } else {
        await apiTryCatch.post('/team-project', payload);
      }

      await invalidateProjects();

      router.push(
        editId
          ? `/dashboard/team-projects/${editId}`
          : '/dashboard/team-projects'
      );
    } catch (error) {
      const fallback = editId
        ? 'Erro ao atualizar projeto'
        : 'Erro ao criar projeto';
      const body = isAxiosError<{ message?: string; errors?: unknown }>(error)
        ? error.response?.data
        : undefined;
      const detalhe = Array.isArray(body?.errors)
        ? body.errors.join(' · ')
        : '';

      toast.error(
        [body?.message, detalhe].filter(Boolean).join(' — ') || fallback
      );
    }
  };

  useEffect(() => {
    async function loadProject() {
      if (!editId) return;
      try {
        const { data } = await apiTryCatch.get<ProjectDetailsType>(
          `/team-project/${editId}`
        );
        setEditingProject(data);
        const assignments = Object.fromEntries(
          (data.stacks || []).map((stack) => [
            stack.stackId,
            getStackAssignmentLabel(stack) ?? '',
          ])
        );
        setStackAssignments(assignments);
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
      } catch {
        toast.error('Erro ao carregar dados do projeto para edição');
      }
    }
    void loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  const onInvalid = (validationErrors: FieldErrors<ProjectFormData>) => {
    const campos: Record<string, string> = {
      name: 'Nome',
      description: 'Descrição',
      deadline: 'Prazo',
      totalValue: 'Valor total',
      github: 'GitHub',
      stacks: 'Stacks',
      skills: 'Skills',
    };

    const pendencias = Object.entries(validationErrors).map(([campo, erro]) => {
      const rotulo = campos[campo] ?? campo;
      const mensagem =
        erro && typeof erro === 'object' && 'message' in erro
          ? String(erro.message ?? '')
          : '';
      return mensagem ? `${rotulo}: ${mensagem}` : rotulo;
    });

    toast.error(
      pendencias.length === 1
        ? pendencias[0]
        : `Verifique os campos: ${pendencias.join(' · ')}`
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="m-5 mx-auto grid max-w-5xl grid-cols-1 gap-6 p-6 md:grid-cols-2"
      >
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="project-name" className="mb-1">
              Nome
            </Label>
            <InputField
              id="project-name"
              placeholder="Nome do projeto"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div>
            <SkillSelector
              selectedSkills={selectedSkills}
              errorMessage={errors.skills?.message}
              onAddSkill={(skillId) =>
                methods.setValue('skills', [...selectedSkills, skillId], {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              onRemoveSkill={(skillId) =>
                methods.setValue(
                  'skills',
                  selectedSkills.filter((id) => id !== skillId),
                  {
                    shouldDirty: true,
                    shouldValidate: true,
                  }
                )
              }
            />
            {errors.skills && (
              <p className="text-sm text-destructive">
                {errors.skills.message}
              </p>
            )}
          </div>

          <div>
            <ProjectStackSelector stackAssignments={stackAssignments} />
            {errors.stacks && (
              <p className="text-sm text-destructive">
                {'message' in errors.stacks ? errors.stacks.message : ''}
              </p>
            )}
          </div>
        </div>

        <div className="mr-8 flex flex-col gap-4">
          <div>
            <Label htmlFor="project-description" className="mb-1">
              Descrição
            </Label>
            <Textarea
              id="project-description"
              className="h-69 break-all"
              placeholder="Descreva o projeto"
              rows={5}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="project-github" className="mb-1">
              GitHub (opcional)
            </Label>
            <InputField
              id="project-github"
              placeholder="https://github.com/usuario/repositorio"
              {...register('github')}
            />
            {errors.github && (
              <p className="text-sm text-destructive">
                {errors.github.message}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="project-deadline" className="mb-1">
                Prazo
              </Label>
              <Controller
                name="deadline"
                control={methods.control}
                render={({ field }) => (
                  <DatePicker
                    id="project-deadline"
                    value={
                      field.value
                        ? parse(field.value, 'yyyy-MM-dd', new Date())
                        : undefined
                    }
                    onChange={(date) =>
                      field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                    }
                    disabledDates={{ before: addDays(new Date(), 1) }}
                    startMonth={new Date()}
                    endMonth={addYears(new Date(), 5)}
                    aria-invalid={!!errors.deadline}
                  />
                )}
              />
              {errors.deadline && (
                <p className="text-sm text-destructive">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <Label htmlFor="project-total-value" className="mb-1">
                Valor (R$)
              </Label>
              <MoneyInput
                id="project-total-value"
                name="totalValue"
                control={methods.control}
              />

              {errors.totalValue && (
                <p className="text-sm text-destructive">
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
