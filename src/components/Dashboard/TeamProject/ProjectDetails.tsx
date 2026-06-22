'use client';

import { useCallback, useEffect, useState } from 'react';
import { Calendar, DollarSign, User } from 'lucide-react';
import { Github } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import type { ProjectDetailsType } from '@/types/interface/team-project';
import { useCurrentUser } from '@/lib/use-current-user';
import { useProjects } from '@/hooks/api/useProjects';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function ProjectDetails({ projectId }: { projectId: string }) {
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
    <div className="space-y-8 p-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">{project.name}</h2>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-medium">
              {project.totalValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span>
              {new Date(project.deadline).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
        {project.github && (
          <div className="ml-4">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600"
            >
              <Github className="h-4 w-4" />
              <span>Repositório</span>
            </a>
          </div>
        )}
        {user && user.id === project.owner.id && (
          <div className="ml-4">
            <Button
              size="sm"
              onClick={() =>
                router.push(`/dashboard/team-projects/${project.id}/edit`)
              }
            >
              Editar
            </Button>
          </div>
        )}
      </div>

      {/* SKILLS ICONS */}
      <div className="skill-icon flex flex-wrap gap-3">
        {(project.skills ?? []).map((skill) => (
          <Image
            key={skill.id}
            src={skill.iconUrl || '/placeholder.png'}
            alt={skill.name}
            title={skill.name}
            width={36}
            height={36}
            className="h-9 w-9"
          />
        ))}
      </div>

      {/* DESCRIÇÃO */}
      <p className="max-w-4xl leading-relaxed break-all text-gray-700">
        {project.description}
      </p>

      {/* STACKS */}
      <div className="grid grid-cols-2 gap-4">
        {(project.stacks ?? []).map((stack) => {
          const takenBy = stack.takenBy;
          const canRelease =
            takenBy && (takenBy.id === user?.id || user?.role === 'ADMIN');

          return (
            <Card
              key={stack.id}
              className={`flex flex-1 items-center justify-between border ${
                takenBy ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <CardContent className="flex w-full items-center justify-between p-4">
                <div>
                  <p className="font-medium text-gray-800">{stack.name}</p>
                  <p className="text-sm text-gray-500">
                    {stack.percentage}% do projeto
                  </p>
                </div>

                {takenBy ? (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      {takenBy.name}
                    </span>
                    {canRelease && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReleaseStack(takenBy.stackTakenId)}
                      >
                        Sair
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button size="sm" onClick={() => handleTakeStack(stack)}>
                    Entrar
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
