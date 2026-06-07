import { Code2 } from 'lucide-react';
import type { PortfolioPublicResponse } from '@/types/portfolio.types';
import { Section } from '@/components/ui/section';
import { SkillChip } from '@/components/ui/skill-chip';

interface PortfolioSkillsSectionProps {
  data: PortfolioPublicResponse;
}

export function PortfolioSkillsSection({ data }: PortfolioSkillsSectionProps) {
  if (!data.skills || data.skills.length === 0) return null;

  return (
    <Section icon={<Code2 className="w-4 h-4" />} title="Tecnologias">
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill) => (
          <SkillChip key={skill.id} name={skill.name} iconUrl={skill.iconUrl} />
        ))}
      </div>
    </Section>
  );
}
