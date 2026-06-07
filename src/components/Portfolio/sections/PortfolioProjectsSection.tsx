import { Briefcase } from 'lucide-react';
import type { PortfolioPublicResponse } from '@/types/portfolio.types';
import { Section } from '@/components/ui/section';

interface PortfolioProjectsSectionProps {
  data: PortfolioPublicResponse;
}

export function PortfolioProjectsSection({ data }: PortfolioProjectsSectionProps) {
  if (!data.projects || data.projects.length === 0) return null;

  return (
    <Section icon={<Briefcase className="w-4 h-4" />} title="Projetos concluídos">
      <div className="grid gap-4 sm:grid-cols-2">
        {data.projects.map((project) => (
          <div
            key={project.projectId}
            className="rounded-lg border border-border bg-card p-4 space-y-3"
          >
            <div>
              <h3 className="text-sm font-medium text-foreground">
                {project.projectName}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {project.description}
              </p>
            </div>

            {project.stacks.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.stacks.map((stack) => (
                  <span
                    key={stack.stackId}
                    className="px-2 py-0.5 rounded-md text-xs
                               bg-primary/10 text-primary border border-primary/20"
                  >
                    {stack.stackName}
                  </span>
                ))}
              </div>
            )}

            <p className="text-[11px] text-muted-foreground">
              Concluído em{' '}
              {new Date(project.deadline).toLocaleDateString('pt-BR', {
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
