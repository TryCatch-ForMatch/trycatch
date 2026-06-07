'use client';

import React from 'react';
import { SkeletonCard } from '@/components/ui/skeleton-card';

export interface InfiniteCardsProps<T> {
  // Dados achatados (flatData do useInfiniteScroll)
  data: T[];

  // Renderiza cada item — você controla o design do card
  renderItem: (item: T, index: number) => React.ReactNode;

  // Ref do container scrollável (do useInfiniteScroll)
  containerRef: React.RefObject<HTMLDivElement | null>;

  // Callback de scroll (dispara fetchMoreOnBottomReached)
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;

  // Estados de loading
  isLoading?: boolean;
  isFetchingNextPage?: boolean;

  // Altura máxima do container com scroll. Default: '80vh'
  // Use 'none' para scroll da página inteira
  height?: string;

  // Colunas do grid. Default: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  gridClassName?: string;

  // Slot para estado vazio
  emptyState?: React.ReactNode;

  // Slot para estado de erro
  errorState?: React.ReactNode;

  // Classes extras no container externo
  className?: string;

  // Extrair uma key única de cada item. Default: usa o índice
  keyExtractor?: (item: T, index: number) => string;
}

// Grid de cards com scroll infinito.
// Sem virtualização — cards têm altura variável e são poucos por página.
// Para listas longas com cards simples, considere usar InfiniteTable.
//
// Uso básico:
//   <InfiniteCards
//     data={flatData}
//     containerRef={containerRef}
//     isFetchingNextPage={isFetchingNextPage}
//     isLoading={isLoading}
//     onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
//     renderItem={(item) => <PortfolioCard portfolio={item} />}
//   />
export function InfiniteCards<T>({
  data,
  renderItem,
  containerRef,
  onScroll,
  isLoading = false,
  isFetchingNextPage = false,
  height = '80vh',
  gridClassName = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  emptyState,
  errorState,
  className = '',
  keyExtractor,
}: InfiniteCardsProps<T>) {
  if (isLoading) {
    return (
      <div className={`grid gap-4 ${gridClassName}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (errorState) return <>{errorState}</>;

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-sm text-muted-foreground">
        {emptyState ?? (
          <>
            <svg className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Nenhum resultado encontrado.</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        onScroll={onScroll}
        style={height !== 'none' ? { height, overflowY: 'auto' } : undefined}
        className="w-full"
      >
        <div className={`grid gap-4 ${gridClassName} p-1`}>
          {data.map((item, index) => (
            <React.Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
              {renderItem(item, index)}
            </React.Fragment>
          ))}
        </div>

        {/* Sentinel de loading no fundo */}
        {isFetchingNextPage && (
          <div className={`grid gap-4 ${gridClassName} mt-4 p-1`}>
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
