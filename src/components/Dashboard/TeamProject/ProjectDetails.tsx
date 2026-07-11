'use client';

import { useCallback, useEffect, useState } from 'react';
import { Calendar, DollarSign, Github, User } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import type { ProjectDetailsType } from '@/types/interface/team-project';
import { useCurrentUser } from '@/lib/use-current-user';
import { useProjects } from '@/hooks/api/useProjects';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function ProjectDetails({ projectId }: Readonly<{ projectId: string }>) {
  const user = useCurrentUser();
  const router = useRouter();
  const { getProjectDetailsById } = useProjects();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetailsProject = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProjectDetailsById(projectId);
      setProject(response);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao carregar detalhes do projeto');
    } finally {
      setLoading(false);
    }
  }, [getProjectDetailsById, projectId]);

  useEffect(() => {
    fetchDetailsProject();
  }, [projectId, fetchDetailsProject]);
  if (loading)
    return <p className="p-6 text-gray-500">Carregando detalhes...</p>;
  if (!project)
    return <p className="p-6 text-gray-500">Projeto não encontrado</p>;

  // Funções de ação
  const handleTakeStack = async (stack: { id: string; stackId: string }) => {
    const data = {
      projectId: project.id,
      projectStackId: stack.id,
      stackId: stack.stackId,
    };
    try {
      const response = await apiTryCatch.post('/stack-taken', data);
      toast.success(response?.data?.message || 'Stack assumida com sucesso!');
      fetchDetailsProject();
    } catch {
      toast.error('Erro ao assumir stack');
    }
  };

  const handleReleaseStack = async (stackTakenId: string) => {
    try {
      const response = await apiTryCatch.delete(`/stack-taken/${stackTakenId}`);
      toast.success(response?.data?.message || 'Stack liberada com sucesso!');
      fetchDetailsProject();
    } catch {
      toast.error('Erro ao liberar stack');
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {project.name}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                <span className="font-medium text-slate-700">
                  {project.totalValue.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                <Calendar className="h-4 w-4 text-slate-600" />
                <span>
                  {new Date(project.deadline).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
              >
                <Github className="h-4 w-4" />
                <span>Repositório</span>
              </a>
            )}
            {user && user.id === project.owner.id && (
              <Button
                size="sm"
                onClick={() =>
                  router.push(`/dashboard/team-projects/${project.id}/edit`)
                }
              >
                Editar
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold tracking-[0.24em] text-slate-500 uppercase">
            Skills
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {(project.skills ?? []).map((skill) =>
            skill.iconUrl ? (
              <div
                key={skill.id}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white p-1 shadow-sm"
                title={skill.name}
              >
                <Image
                  src={skill.iconUrl}
                  alt={skill.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </div>
            ) : (
              <span
                key={skill.id}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
              >
                {skill.name}
              </span>
            )
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-xs font-semibold tracking-[0.24em] text-slate-500 uppercase">
          Descrição
        </h3>
        <p className="max-w-4xl text-sm leading-7 wrap-break-word whitespace-pre-line text-slate-600">
          {project.description}
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-semibold tracking-[0.24em] text-slate-500 uppercase">
            Stacks
          </h3>
          <span className="text-xs text-slate-500">
            {project.stacks?.length ?? 0} itens
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {(project.stacks ?? []).map((stack) => {
            const takenBy = stack.takenBy;
            const canRelease =
              takenBy && (takenBy.id === user?.id || user?.role === 'ADMIN');

            return (
              <Card
                key={stack.id}
                className={`rounded-xl border transition-colors ${
                  takenBy
                    ? 'border-blue-200 bg-blue-50/70'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      {stack.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {stack.percentage}% do projeto
                    </p>
                  </div>

                  {takenBy ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-blue-700">
                        <User className="h-3.5 w-3.5" />
                        <span>{takenBy.name}</span>
                      </div>
                      {canRelease && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 px-3 text-xs"
                          onClick={() =>
                            handleReleaseStack(takenBy.stackTakenId)
                          }
                        >
                          Sair
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="h-8 px-3 text-xs"
                      onClick={() => handleTakeStack(stack)}
                    >
                      Entrar
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
