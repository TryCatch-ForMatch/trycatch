'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';

import { useProjects } from '@/hooks/api/useProjects';
import { ChangeEvent } from 'react';

import { CardProjectSummary } from '@/components/Dashboard/TeamProject';
import { ProjectSummarySkeletonGrid } from '@/components/ui/SkeletonProjetcs/SkeletonProjectGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, Search } from 'lucide-react';

const placeholderFilters = ['Recentes', 'Classificar', 'Filtrar'];

export default function TeamProjectPage() {
  const { allProjects, isProjectsLoading } = useProjects();
  const [valorProject, setValorProject] = useState('');

  const allProjectsFiltrados = useMemo(() => {
    return allProjects.filter((project) =>
      project.name.toLowerCase().includes(valorProject.toLowerCase())
    );
  }, [valorProject, allProjects]);

  return (
    <main className="space-y-4 p-6">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-foreground">Projetos</h1>
          <div className="mt-1 flex gap-4">
            {placeholderFilters.map((label) => (
              <Badge
                key={label}
                variant="secondary"
                className="rounded-sm px-2 py-1 text-sm font-normal"
              >
                <Clock aria-hidden />
                {label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex w-full max-w-md flex-wrap items-center justify-end gap-2">
          <div className="relative h-10 flex-1">
            <Input
              name="search"
              type="search"
              aria-label="Pesquisar projetos"
              placeholder="Pesquisa projetos"
              className="h-10 pr-8"
              value={valorProject}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValorProject(e.target.value)
              }
            />
            <Search
              aria-hidden
              className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>

          <div>
            <Button asChild className="flex h-10 items-center">
              <Link href="/dashboard/team-projects/new">
                <span>Novo Projeto</span>
                <Plus aria-hidden className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {isProjectsLoading ? (
        <ProjectSummarySkeletonGrid />
      ) : allProjectsFiltrados.length === 0 ? (
        <div className="text-xl font-medium text-muted-foreground">
          Nenhum projeto encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {allProjectsFiltrados.map((project) => (
            <CardProjectSummary
              key={project.id}
              project={project}
              href={`/dashboard/team-projects/${project.id}`}
            />
          ))}
        </div>
      )}
    </main>
  );
}
