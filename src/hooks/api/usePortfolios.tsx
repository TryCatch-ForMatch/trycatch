import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { useEffect, useState, useMemo } from 'react';
import { UserPortfolioCardData } from '@/types/interface/user-portfolio';

interface PortfolioSummaryApi {
  id: string;
  avatar: string | null;
  name: string;
  role: string;
  bio: string | null;
  skills: {
    id: string;
    name: string;
    iconUrl: string | null;
  }[];
  github: string | null;
  linkedin: string | null;
}

export function usePortfolios() {
  const [portfolios, setPortfolios] = useState<UserPortfolioCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPortfolios = async () => {
    setIsLoading(true);
    try {
      const res =
        await apiTryCatch.get<PortfolioSummaryApi[]>('/portfolio/summary');

      const mappedPortfolios: UserPortfolioCardData[] = res.data.map(
        (user) => ({
          id: user.id,
          avatarUrl: user.avatar,
          displayName: user.name,
          role: user.role,
          bio: user.bio,
          skills: user.skills,
          githubUrl: user.github,
          linkedinUrl: user.linkedin,
        })
      );

      setPortfolios(mappedPortfolios);
    } catch (err) {
      console.error('Erro ao buscar portfólios', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return {
    portfolios,
    isLoading,
  };
}
