import Link from 'next/link';
import Image from 'next/image';
import { Clock, Check, Ellipsis, Users, Calendar1 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ProjectSummaryType } from '@/types/interface/team-project';

const STATUS = {
  BUSCANDO: { label: 'Aberto', icon: Ellipsis },
  EM_ANDAMENTO: { label: 'Em produção', icon: Clock },
  CONCLUIDO: { label: 'Finalizado', icon: Check },
} as const;

interface CardProjectSummaryProps {
  project: ProjectSummaryType;
  href: string;
}

export function CardProjectSummary({ project, href }: CardProjectSummaryProps) {
  const status =
    STATUS[project.status as keyof typeof STATUS] ?? STATUS.BUSCANDO;
  const StatusIcon = status.icon;

  return (
    <Link
      href={href}
      className="block rounded-md border bg-primary-light/50 p-4 transition hover:shadow-sm focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="mb-2 flex items-center justify-between text-primary">
        <h3 className="text-lg font-medium">{project.name}</h3>
        <span className="flex items-center gap-1">
          <Users aria-hidden size={15} />
          <span className="sr-only">Stacks preenchidas:</span>
          {project.stacksFilled}/{project.stacksTotal}
        </span>
      </div>

      <div className="flex flex-col rounded-md bg-white p-4 break-all">
        <div className="skill-icon mb-2 flex flex-wrap gap-2">
          {project?.skills?.map((skill) =>
            skill.iconUrl ? (
              <Image
                key={skill.id}
                src={skill.iconUrl}
                alt={skill.name}
                width={24}
                height={24}
                className="rounded"
              />
            ) : (
              <Badge key={skill.id} variant="outline">
                {skill.name}
              </Badge>
            )
          )}
        </div>

        <p className="line-clamp-2 text-sm text-foreground">
          {project.description}
        </p>

        <div className="mt-3 flex justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar1 aria-hidden size={15} />
            {project?.deadline
              ? new Date(project.deadline).toLocaleDateString('pt-BR')
              : 'Sem data'}
          </span>

          <Badge className="rounded p-1">
            <StatusIcon aria-hidden />
            <span className="sr-only">{status.label}</span>
          </Badge>
        </div>
      </div>
    </Link>
  );
}
