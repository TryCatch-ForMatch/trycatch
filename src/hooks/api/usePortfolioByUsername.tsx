'use client';

import { useEffect, useState } from 'react';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { PublicPortfolio } from '@/types/portfolio/public-portfolio';
import { AxiosError } from 'axios';

export function usePortfolioByUsername(username: string) {
  const [portfolio, setPortfolio] = useState<PublicPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPortfolio() {
      setIsLoading(true);
      setNotFound(false);

      try {
        const response = await apiTryCatch.get<PublicPortfolio>(
          `/portfolio/${username}`
        );
        setPortfolio(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            setNotFound(true);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (username) fetchPortfolio();
  }, [username]);

  return { portfolio, isLoading, notFound };
}
