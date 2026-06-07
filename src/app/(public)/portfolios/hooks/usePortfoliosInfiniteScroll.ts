import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { PortfolioSummaryItem } from "@/types/portfolio.types";
import { useCallback } from "react";
import { Filters } from "../models";

export function usePortfoliosInfiniteScroll(filters: Filters) {
  const { flatData, isLoading, isFetchingNextPage, containerRef, fetchMoreOnBottomReached, error } =
    useInfiniteScroll<PortfolioSummaryItem>({
      // filtros no queryKey garantem refetch automático ao mudar filtros
      // e resetam o cursor para undefined (nova query = começa do zero)
      queryKey: ['portfolios', filters],
      fetcher: async (cursor) => {
        const res = await fetch(buildUrl(cursor));
        if (!res.ok) throw new Error(`Erro ao buscar portfólios: HTTP ${res.status}`);
        return res.json();
      },
    });
  
  // Monta a URL com os filtros ativos
  const buildUrl = useCallback(
    (cursor: string | undefined) => {
      const params = new URLSearchParams();
      if (cursor) params.set('cursor', cursor);
      if (filters.name) params.set('name', filters.name);
      if (filters.role) params.set('role', filters.role);
      if (filters.skills) params.set('skills', filters.skills);
      params.set('take', '20');
      return `/api/portfolios?${params.toString()}`;
    },
    [filters],
  );
  
  return {
    flatData,
    isLoading, 
    isFetchingNextPage, 
    containerRef,
    fetchMoreOnBottomReached, 
    error
  }
}