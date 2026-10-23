import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { PortfolioSummaryItem } from '@/types/portfolio.types';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import type { PortfolioFilters } from '@/types/portfolio-filters';

export function usePortfoliosInfiniteScroll(filters: PortfolioFilters) {
  const {
    flatData,
    isLoading,
    isFetchingNextPage,
    containerRef,
    fetchMoreOnBottomReached,
    error,
  } = useInfiniteScroll<PortfolioSummaryItem>({
    queryKey: ['portfolios', filters],
    fetcher: async (cursor) => {
      const { data } = await apiTryCatch.get('/portfolios', {
        params: {
          cursor: cursor || undefined,
          name: filters.name || undefined,
          role: filters.role || undefined,
          skills: filters.skills || undefined,
          take: 20,
        },
      });
      return data;
    },
  });

  return {
    flatData,
    isLoading,
    isFetchingNextPage,
    containerRef,
    fetchMoreOnBottomReached,
    error,
  };
}
