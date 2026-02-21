import { PublicPortfolioPage } from '@/components/Portfolio/PublicPortfolioPage';

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function Page({ params }: PageProps) {
  const { username } = await params;

  return <PublicPortfolioPage userName={username} />;
}
