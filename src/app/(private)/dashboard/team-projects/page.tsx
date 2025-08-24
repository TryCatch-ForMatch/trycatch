'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/modal';
import { CardProjectSummary } from '@/components/dashboard/TeamProject';
import { ProjectSummaryType } from '@/types/team-project';
import { ProjectDetails } from '@/components/dashboard/TeamProject';

export default function TeamProjectPage() {
  const [projects, setProjects] = useState<ProjectSummaryType[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/team-project/summary')
      .then((res) => res.json())
      .then(setProjects)
      .catch((err) => console.error('Erro ao buscar projetos:', err));
  }, []);

  return (
    <main className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team Projects</h1>
      </div>

      {/* Cards dos projetos resumidos */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => (
          <CardProjectSummary
            key={project.id}
            project={project}
            onClick={() => setSelectedId(project.id)}
          />
        ))}
      </div>

      {/* Modal com detalhes */}
      <Modal
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
        title="Detalhes do Projeto"
        size="xl"
      >
        {selectedId && <ProjectDetails projectId={selectedId} />}
      </Modal>
    </main>
  );
}
