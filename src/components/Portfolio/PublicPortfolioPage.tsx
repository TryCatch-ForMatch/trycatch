import type { PortfolioPublicResponse } from '@/types/portfolio.types';
import { PortfolioIdentitySection } from './sections/PortfolioIdentitySection';
import { PortfolioSkillsSection } from './sections/PortfolioSkillsSection';
import { PortfolioProjectsSection } from './sections/PortfolioProjectsSection';
import { PortfolioCertificatesSection } from './sections/PortfolioCertificatesSection';
import { PortfolioFeedbackSection } from './sections/PortfolioFeedbackSection';

interface PublicPortfolioPageProps {
  data: PortfolioPublicResponse;
}

export function PublicPortfolioPage({ data }: PublicPortfolioPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-10">
        <PortfolioIdentitySection data={data} />
        <PortfolioSkillsSection data={data} />
        <PortfolioProjectsSection data={data} />
        <PortfolioCertificatesSection data={data} />
        {/* <PortfolioFeedbackSection data={data} /> */}
      </div>
    </main>
  );
}
