'use client';

import { useEffect, useState } from 'react';
import { Calendar, DollarSign, User } from 'lucide-react';
import { ProjectDetailsType } from '@/types/team-project';
import { useCurrentUser } from '@/lib/use-current-user';
import { toast } from 'sonner';
import Image from 'next/image';

interface ProjectDetailsProps {
  projectId: string;
}

export function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const user = useCurrentUser();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, [projectId]);

  if (!user) return <p>Você precisa estar logado para ver detalhes</p>;

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/team-project/${projectId}`);
      const data = await res.json();
      console.log('📌 Dados do projeto:', data);
      setProject(data);
    } catch (err) {
      console.error('Erro ao buscar detalhes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTakeStack = async (stack: { id: string; stackId: string }) => {
    try {
      const res = await fetch('/api/stack-taken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project?.id,
          projectStackId: stack.id,
          stackId: stack.stackId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error('Erro ao assumir stack');
        return;
      }

      toast.success('Stack assumida com sucesso!');
      fetchDetails();
    } catch (error) {
      console.error('Erro ao assumir stack:', error);
      toast.error('Erro inesperado');
    }
  };

  // Liberar stack
  const handleReleaseStack = async (stackTakenId: string) => {
    if (!confirm('Tem certeza que deseja liberar esta stack?')) return;

    try {
      const res = await fetch(`/api/stack-taken/${stackTakenId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Erro ao liberar stack');
        return;
      }

      toast.success('Stack liberada com sucesso!');
      fetchDetails();
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
