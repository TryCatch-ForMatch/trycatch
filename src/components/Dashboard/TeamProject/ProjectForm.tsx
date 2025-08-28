'use client';

import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProjectStackSelector } from './ProjectStackSelector';

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
  totalValue: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: 'Valor total deve ser maior ou igual a 0',
    }),
  stacks: z
    .array(
      z.object({
        stackId: z.string().min(1, 'Selecione uma stack'),
        percentage: z
          .number()
          .min(1, 'Percentual mínimo é 1')
          .max(100, 'Percentual máximo é 100'),
      })
    )
    .min(1, 'Selecione pelo menos uma stack')
    .refine((arr) => arr.reduce((sum, s) => sum + s.percentage, 0) === 100, {
      message: 'A soma dos percentuais deve ser 100%',
    }),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export function ProjectForm() {
  const router = useRouter();

  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      deadline: '',
      totalValue: '',
      stacks: [{ stackId: '', percentage: 0 }],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const payload = {
        ...data,
        totalValue: parseFloat(data.totalValue),
        status: 'BUSCANDO',
      };

      const res = await fetch('/api/team-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Erro ao criar projeto');
      }

      router.push('/dashboard/team-projects');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar projeto');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full grid-cols-2 gap-6"
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

          {/* Espaço para ProjectSkillSelector no futuro */}
          <div className="flex h-[140px] items-center justify-center border border-dashed border-gray-300">
            <span className="text-gray-400">ProjectSkillSelector aqui</span>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Stacks</label>
            <ProjectStackSelector />
            {errors.stacks && (
              <p className="text-sm text-red-500">{errors.stacks.message}</p>
            )}
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="mr-8 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Descrição</label>
            <Textarea
              className="h-69"
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

          {/* Prazo e Valor lado a lado */}
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
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('totalValue')}
              />
              {errors.totalValue && (
                <p className="text-sm text-red-500">
                  {errors.totalValue.message}
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
