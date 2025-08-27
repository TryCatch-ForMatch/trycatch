'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ProjectStackSelector } from './ProjectStackSelector';

const projectSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  description: z.string().min(1, 'Descrição obrigatória'),
  deadline: z.string().min(1, 'Data obrigatória'),
  totalValue: z.number().min(0, 'Valor obrigatório'),
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
    .min(1, 'Adicione pelo menos uma stack')
    .refine((arr) => arr.reduce((sum, s) => sum + s.percentage, 0) === 100, {
      message: 'A soma dos percentuais deve ser 100%',
    }),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export function ProjectForm() {
  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      deadline: '',
      totalValue: 0,
      stacks: [{ stackId: '', percentage: 0 }],
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    // Envie todos os dados, inclusive stacks com percentuais
    console.log('Payload para API:', data);
    // fetch('/api/team-project', { method: 'POST', body: JSON.stringify(data) })
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* ...outros campos do formulário... */}
        <ProjectStackSelector />
        {/* ...botão de submit... */}
      </form>
    </FormProvider>
  );
}
