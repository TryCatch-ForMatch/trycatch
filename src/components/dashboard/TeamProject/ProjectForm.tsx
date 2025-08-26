'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ProjectStackSelector } from './ProjectStackSelector';
// import { ProjectSkillSelector } from './ProjectSkillSelector' // futuro

type ProjectForm = {
  name: string;
  description: string;
  stacks: { stackId: string; percentage: number }[];
  skills: string[]; // provisório
};

export function ProjectForm() {
  const methods = useForm<ProjectForm>({
    defaultValues: {
      name: '',
      description: '',
      stacks: [],
      skills: [],
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log('📦 Dados enviados:', data);
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="mx-auto max-w-2xl space-y-6 rounded-2xl bg-white p-6 shadow"
      >
        {/* Dados básicos */}
        <div>
          <label className="block text-sm font-medium">Nome do projeto</label>
          <Input
            {...methods.register('name')}
            placeholder="Ex: Plataforma de Mentoria"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Descrição</label>
          <Textarea
            {...methods.register('description')}
            placeholder="Explique resumidamente o objetivo do projeto..."
          />
        </div>

        {/* Seleção de stacks */}
        <div>
          {/* <h2 className="text-lg font-semibold">Stacks</h2> */}
          <ProjectStackSelector />
        </div>

        {/* Placeholder para skills */}
        <div>
          <h2 className="text-lg font-semibold">Skills (provisório)</h2>
          <p className="text-sm text-gray-500">
            Aqui futuramente entra o <code>ProjectSkillSelector</code>.
          </p>
        </div>

        {/* Botão submit */}
        <Button
          type="submit"
          className="w-full bg-[#3B38A0] hover:bg-[#2F2C80]"
        >
          Criar Projeto
        </Button>
      </form>
    </FormProvider>
  );
}
