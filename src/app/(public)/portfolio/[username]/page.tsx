import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PublicPortfolioPage } from '@/components/Portfolio/PublicPortfolioPage';
import {
  getPublicPortfolio,
  PortfolioNotFoundError,
} from '@/lib/portfolio.service';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  try {
    const data = await getPublicPortfolio(username);
    return {
      title: data.name,
      description:
        data.bio ?? `Portfólio de ${data.name} na plataforma TryCatch.`,
    };
  } catch {
    return { title: 'Portfólio não encontrado' };
  }
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  try {
    const data = await getPublicPortfolio(username);
    return <PublicPortfolioPage data={data} />;
  } catch (err) {
    if (err instanceof PortfolioNotFoundError) notFound();
    throw err;
  }
}
