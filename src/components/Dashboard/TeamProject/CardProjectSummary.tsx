'use client';

import { Clock, Check, Ellipsis, Users, Calendar1 } from 'lucide-react';
import Image from 'next/image';
import { ProjectSummaryType } from '@/types/interface/team-project';

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
      className="cursor-pointer rounded-md border bg-[#EDEDFF] p-4 transition hover:shadow-sm"
    >
      {/* Nome do projeto */}
      <div className="mb-2 flex items-center justify-between text-[#3B38A0]">
        <h3 className="text-lg font-medium">{project.name}</h3>
        <span className="flex items-center gap-1">
          <Users size={15} />
          {project.stacksFilled}/{project.stacksTotal}
        </span>
      </div>

      {/* Descrição resumida */}
      <div className="flex flex-col rounded-md bg-white p-4 break-all">
        {/* Ícones das skills */}
        <div className="skill-icon mb-2 flex gap-2">
          {project?.skills?.map((skill) => (
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

        <p className="line-clamp-2 text-sm text-gray-700">
          {project.description}
        </p>

        {/* Rodapé com infos */}
        <div className="mt-3 flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar1 size={15} />
            {project?.deadline
              ? new Date(project.deadline).toLocaleDateString('pt-BR')
              : 'Sem data'}
          </span>

          <span className="flex items-center gap-1 rounded bg-[#3B38A0] p-1 text-white">
            {project.status === 'EM_ANDAMENTO' ? (
              <Clock size={12} />
            ) : project.status === 'CONCLUIDO' ? (
              <Check size={12} />
            ) : (
              <Ellipsis size={12} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
