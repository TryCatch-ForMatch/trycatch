'use client';

import Image from 'next/image';
import { PublicPortfolio } from '@/types/portfolio/public-portfolio';

interface PortfolioSkillsSectionProps {
  data: PublicPortfolio;
}

export function PortfolioSkillsSection({ data }: PortfolioSkillsSectionProps) {
  if (!data.skills || data.skills.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h2 className="mb-6 text-2xl font-semibold text-[#101014]">
        Tecnologias
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.skills.map(({ skill }) => (
          <div
            key={skill.id}
            className="flex items-center gap-2 rounded-xl border border-[#EAEAEB] bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
          >
            <Image
              src={skill.iconUrl || '/placeholder.png'}
              alt={skill.name}
              width={20}
              height={20}
              className="h-5 w-5"
            />

            <span className="text-sm font-medium text-[#35343C]">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
