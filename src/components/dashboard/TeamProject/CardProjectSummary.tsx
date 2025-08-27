'use client';

import { Clock, Users } from 'lucide-react';
import Image from 'next/image';
import { ProjectSummaryType } from '@/types/team-project';

interface CardProjectSummaryProps {
  project: ProjectSummaryType;
  onClick: () => void;
}

export function CardProjectSummary({
  project,
  onClick,
}: CardProjectSummaryProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border p-4 shadow-sm transition hover:shadow-md"
    >
      {/* Nome do projeto */}
      <h3 className="mb-2 text-lg font-bold">{project.name}</h3>

      {/* Ícones das skills */}
      <div className="mb-2 flex gap-2">
        {project.skills.map((skill) => (
          <Image
            key={skill.id}
            src={skill.iconUrl || '/placeholder-icon.png'}
            alt={skill.name}
            width={24}
            height={24}
            className="rounded"
          />
        ))}
      </div>

      {/* Descrição resumida */}
      <p className="line-clamp-2 text-sm text-gray-600">
        {project.description}
      </p>

      {/* Rodapé com infos */}
      <div className="mt-3 flex justify-between text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {new Date(project.deadline).toLocaleDateString('pt-BR')}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {project.stacksFilled}/{project.stacksTotal} stacks
        </span>
      </div>
    </div>
  );
}
