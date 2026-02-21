'use client';

import { Card, CardContent } from '@/components/ui/card';
import { PublicPortfolio } from '@/types/portfolio/public-portfolio';

interface PortfolioProjectsSectionProps {
  data: PublicPortfolio;
}

export function PortfolioProjectsSection({
  data,
}: PortfolioProjectsSectionProps) {
  if (!data.projects || data.projects.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h2 className="mb-6 text-2xl font-semibold text-[#101014]">
        Projetos Concluídos
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {data.projects.map((project) => (
          <Card
            key={project.id}
            className="rounded-2xl border border-[#EAEAEB] shadow-sm transition hover:shadow-md"
          >
            <CardContent className="space-y-4 p-5">
              <h3 className="text-base font-semibold text-[#101014]">
                {project.name}
              </h3>

              {project.description && (
                <p className="line-clamp-3 text-sm text-[#5C5C65]">
                  {project.description}
                </p>
              )}

              {/* Stacks assumidas */}
              {project.stacks.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.stacks.map((stack) => (
                    <span
                      key={stack.id}
                      className="rounded-full bg-[#D9D9ED] px-3 py-1 text-xs font-medium text-[#3B38A0]"
                    >
                      {stack.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Skills do projeto */}
              {project.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full border border-[#EAEAEB] px-3 py-1 text-xs text-[#35343C]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
