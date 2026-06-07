
import { useCallback, useEffect, useRef } from 'react';
import {
  useInfiniteQuery,
  keepPreviousData,
  type QueryKey,
} from '@tanstack/react-query';

// Contrato mínimo que o fetcher deve retornar —
// corresponde ao PaginatedResponse<T> do backend
export interface InfiniteScrollPage<T> {
  data: {
    items: T[];
    nextCursor: string | null;
    hasNextPage: boolean;
  };
}

export interface UseInfiniteScrollOptions<T> {
  // queryKey deve incluir os filtros ativos para que o react-query
  // refaça o fetch automaticamente quando eles mudarem
  queryKey: QueryKey;
  // Função que busca uma página. Recebe o cursor da próxima página
  // (undefined na primeira carga) e retorna a resposta paginada.
  fetcher: (cursor: string | undefined) => Promise<InfiniteScrollPage<T>>;
  // Quantos px do fundo do container devem disparar o próximo fetch.
  // Default: 400px
  scrollThreshold?: number;
  // Quantos itens buscar por página. Default: 20
  take?: number;
  // Desabilita o fetch (útil enquanto um modal está aberto, por ex.)
  enabled?: boolean;
}

export interface UseInfiniteScrollResult<T> {
  // Todos os itens de todas as páginas achatados em um array
  flatData: T[];
  // Se está carregando a primeira página
  isLoading: boolean;
  // Se está carregando mais páginas (scroll)
  isFetchingNextPage: boolean;
  // Se há mais páginas disponíveis
  hasNextPage: boolean;
  // Ref para ser passado ao container scrollável
  containerRef: React.RefObject<HTMLDivElement | null>;
  // Chame no onScroll do container para disparar o próximo fetch
  fetchMoreOnBottomReached: (el: HTMLDivElement | null) => void;
  // Erro, se houver
  error: Error | null;
}

//
// Hook genérico de scroll infinito com cursor pagination.
// Usado tanto pelo InfiniteTable quanto pelo InfiniteCards.
//
// Dependências:
//   npm install @tanstack/react-query@5
//
// Uso:
//   const result = useInfiniteScroll({
//     queryKey: ['portfolios', filters],
//     fetcher: (cursor) => fetch(`/api/portfolios?cursor=${cursor ?? ''}`).then(r => r.json()),
//   })
export function useInfiniteScroll<T>({
  queryKey,
  fetcher,
  scrollThreshold = 400,
  enabled = true,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollResult<T> {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, isFetchingNextPage, isLoading, hasNextPage, error } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => fetcher(pageParam as string | undefined),
      initialPageParam: undefined as string | undefined,
      // O backend retorna nextCursor — passamos direto como próximo pageParam
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNextPage ? lastPage.data.nextCursor ?? undefined : undefined,
      // Mantém dados anteriores enquanto carrega a próxima página
      // evita flash de "vazio" ao mudar filtros
      placeholderData: keepPreviousData,
      enabled,
      // Sem retries automáticos — erros devem surfaçar imediatamente
      // para que o consumer possa exibir o errorState sem esperar tentativas
      retry: false,
      // Não refaz fetch ao voltar para a aba — dados de listagem raramente mudam
      refetchOnWindowFocus: false,
    });

  // Achata todas as páginas em um único array
  const flatData: T[] = data?.pages.flatMap((page) => page.data.items) ?? [];

  // Dispara fetchNextPage quando o usuário chega próximo ao final do container
  const fetchMoreOnBottomReached = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;
      const { scrollHeight, scrollTop, clientHeight } = el;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceToBottom < scrollThreshold && !isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, isFetchingNextPage, hasNextPage, scrollThreshold],
  );

  // Verifica na montagem — necessário quando o container já tem menos
  // itens do que a altura visível (ex: primeira carga com poucos resultados)
  useEffect(() => {
    fetchMoreOnBottomReached(containerRef.current);
  }, [fetchMoreOnBottomReached]);

  return {
    flatData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    containerRef,
    fetchMoreOnBottomReached,
    error: error as Error | null,
  };
}
