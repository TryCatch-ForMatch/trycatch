'use client';

import { useEffect, useState } from 'react';
import { Calendar, DollarSign, User } from 'lucide-react';
import { ProjectDetailsType } from '@/types/interface/team-project';
import { useCurrentUser } from '@/lib/use-current-user';
import { useProjects } from '@/hooks/useProjects';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { toast } from 'sonner';
import Image from 'next/image';

export function ProjectDetails({ projectId }: { projectId: string }) {
  const user = useCurrentUser();
  const { getProjectDetailsById } = useProjects();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchDetailsProject() {
    setLoading(true);
    try {
      const response = await getProjectDetailsById(projectId);
      setProject(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDetailsProject();
  }, [projectId]);

  if (!user) return null;

  const handleTakeStack = async (stack: { id: string; stackId: string }) => {
    const data = {
      projectId: project?.id,
      projectStackId: stack.id,
      stackId: stack.stackId,
    };
    try {
      const response = await apiTryCatch.post('/stack-taken', data);
      console.log(response);
      fetchDetailsProject();
      toast.success(response?.data?.message || ' Stack assumida com sucesso!');
    } catch (error) {
      console.error('Erro ao assumir stack:', error);
      toast.error('Erro inesperado');
    }
  };

  // Liberar stack
  const handleReleaseStack = async (stackTakenId: string) => {
    try {
      const response = await apiTryCatch.delete(`/stack-taken/${stackTakenId}`);
      toast.success(response?.data?.message || 'Stack liberada com sucesso!');
      fetchDetailsProject();
    } catch (error) {
      console.error('Erro ao liberar stack:', error);
      toast.error('Erro inesperado');
    }
  };

  if (loading) return <p>Carregando detalhes...</p>;
  if (!project) return <p>Projeto não encontrado</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          {new Date(project.deadline).toLocaleDateString('pt-BR')}
        </div>
      </div>

      {/* Skills + valor */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(project.skills ?? []).map((skill) => (
            <Image
              key={skill.id}
              src={skill.iconUrl || '/placeholder.png'}
              alt={skill.name}
              title={skill.name}
              width={32}
              height={32}
              className="h-8 w-8"
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <DollarSign className="h-5 w-5 text-green-600" />
          {project.totalValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </div>
      </div>

      {/* Descrição */}
      <p className="text-gray-700">{project.description}</p>

      {/* Stacks */}
      <div className="space-y-3">
        {(project.stacks ?? []).map((stack) => {
          const takenBy = stack.takenBy;

          console.log('🔎 Stack:', stack.name, {
            takenById: takenBy?.id,
            loggedUserId: user.id,
          });

          const canRelease =
            takenBy && (takenBy.id === user.id || user.role === 'ADMIN');

          return (
            <div
              key={stack.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-semibold">{stack.name}</p>
                <p className="text-sm text-gray-500">
                  {stack.percentage}% do projeto
                </p>
              </div>

              {/* Se stack já está ocupada */}
              {takenBy ? (
                <div className="flex items-center gap-2 text-blue-600">
                  <User className="h-4 w-4" />
                  <span>{takenBy.name}</span>

                  {/* Botão SAIR só aparece se é o mesmo usuário ou ADMIN */}
                  {canRelease && (
                    <button
                      onClick={() => handleReleaseStack(takenBy.stackTakenId)}
                      className="rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600"
                    >
                      Sair
                    </button>
                  )}
                </div>
              ) : (
                // Se não tem ninguém ocupando → botão assumir
                <button
                  onClick={() => handleTakeStack(stack)}
                  className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                >
                  Assumir stack
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
