'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

//import hook
import { useProjects } from '@/hooks/api/useProjects';
import { ChangeEvent } from 'react';

import { CardProjectSummary } from '@/components/Dashboard/TeamProject';
import { ProjectSummarySkeletonGrid } from '@/components/layout/Loading/SkeletonProjetcs/SkeletonProjectGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Clock, Search } from 'lucide-react';

export default function TeamProjectPage() {
  const { allProjects, isProjectsLoading } = useProjects();
  const [valorProject, setValorProject] = useState('');
  const router = useRouter();

  const allProjectsFiltrados = useMemo(() => {
    return allProjects.filter((project) =>
      project.name.toLowerCase().includes(valorProject.toLowerCase())
    );
  }, [valorProject, allProjects]);

  return (
    <main className="space-y-4 p-6">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-700">Projetos</h1>
          <div className="mt-1 flex gap-4 text-sm font-normal text-gray-700">
            <span className="flex items-center gap-1 rounded-sm bg-gray-200 p-2 py-1">
              {' '}
              <Clock size={12} /> <span>Recentes</span>
            </span>
            <span className="flex items-center gap-1 rounded-sm bg-gray-200 p-2 py-1">
              {' '}
              <Clock size={12} /> <span>Classificar</span>
            </span>
            <span className="flex items-center gap-1 rounded-sm bg-gray-200 p-2 py-1">
              {' '}
              <Clock size={12} /> <span>Filtrar</span>
            </span>
          </div>
        </div>

        <div className="flex w-full max-w-md flex-wrap items-center justify-end gap-2">
          <div className="relative h-10 flex-1">
            <Input
              name="email"
              type="search"
              placeholder="Pesquisa projetos"
              className="h-10 pr-8"
              value={valorProject}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValorProject(e.target.value)
              }
            />
            <Search className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          <div>
            <Button
              className="flex h-10 items-center"
              variant="default"
              onClick={() => router.push('/dashboard/team-projects/new')}
            >
              <span>Novo Projeto</span>
              <Plus className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {isProjectsLoading ? (
        <ProjectSummarySkeletonGrid />
      ) : allProjectsFiltrados.length === 0 ? (
        <div className="text-xl font-medium text-gray-500">
          Nenhum projeto encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {allProjectsFiltrados.map((project) => (
            <CardProjectSummary
              key={project.id}
              project={project}
              onClick={() =>
                router.push(`/dashboard/team-projects/${project.id}`)
              }
            />
          ))}
        </div>
      )}
    </main>
  );
}
