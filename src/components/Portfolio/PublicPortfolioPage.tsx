'use client';

import { PortfolioIdentitySection } from './sections/PortfolioIdentitySection';
import { PortfolioSkillsSection } from './sections/PortfolioSkillsSection';
import { PortfolioCertificatesSection } from './sections/PortfolioCertificatesSection';
import { PortfolioProjectsSection } from './sections/PortfolioProjectsSection';
import { PortfolioFeedbackSection } from './sections/PortfolioFeedbackSection';
import { usePortfolioByUsername } from '@/hooks/api/usePortfolioByUsername';
import { notFound } from 'next/navigation';

interface PublicPortfolioPageProps {
  userName: string;
}

export function PublicPortfolioPage({ userName }: PublicPortfolioPageProps) {
  const { portfolio, isLoading } = usePortfolioByUsername(userName);

  if (isLoading) return null;

  if (!portfolio) return notFound();

  return (
    <>
      <PortfolioIdentitySection data={portfolio} />
      <PortfolioSkillsSection data={portfolio} />
      <PortfolioCertificatesSection data={portfolio} />
      <PortfolioProjectsSection data={portfolio} />
      <PortfolioFeedbackSection data={portfolio} />
    </>
  );
}
