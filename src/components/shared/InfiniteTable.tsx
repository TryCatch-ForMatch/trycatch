'use client';

import React from 'react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type Row,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SortIcon } from '@/components/ui/sort-icon';

export interface InfiniteTableProps<T> {
  // Dados achatados (flatData do useInfiniteScroll)
  data: T[];

  // Definição de colunas do TanStack Table
  columns: ColumnDef<T>[];

  // Ref do container scrollável (do useInfiniteScroll)
  containerRef: React.RefObject<HTMLDivElement | null>;

  // Callback de scroll (dispara fetchMoreOnBottomReached)
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;

  // Estados de loading
  isLoading?: boolean;
  isFetchingNextPage?: boolean;

  // Altura fixa do container. Default: '600px'
  // Necessário para o virtualizer calcular o espaço visível
  height?: string;

  // Altura estimada de cada linha em px. Default: 48
  estimatedRowHeight?: number;

  // Sorting controlado externamente (opcional)
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;

  // Slot para estado vazio
  emptyState?: React.ReactNode;

  // Slot para estado de erro
  errorState?: React.ReactNode;

  // Classes extras no container
  className?: string;
}

// Tabela genérica com scroll infinito virtualizado.
// Usa TanStack Table (layout/colunas) + TanStack Virtual (DOM virtual).
//
// Dependências:
//   npm install @tanstack/react-table@8 @tanstack/react-virtual@3
//
// Uso básico:
//   <InfiniteTable
//     data={flatData}
//     columns={columns}
//     containerRef={containerRef}
//     isFetchingNextPage={isFetchingNextPage}
//     isLoading={isLoading}
//     onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
//   />
export function InfiniteTable<T>({
  data,
  columns,
  containerRef,
  onScroll,
  isLoading = false,
  isFetchingNextPage = false,
  height = '600px',
  estimatedRowHeight = 48,
  sorting,
  onSortingChange,
  emptyState,
  errorState,
  className = '',
}: InfiniteTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    state: { sorting: sorting ?? [] },
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // Sorting feito no servidor — o componente não re-ordena localmente
    manualSorting: true,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => estimatedRowHeight,
    getScrollElement: () => containerRef.current,
    // Mede altura real de cada linha para scrollbar precisa
    // Exceto no Firefox onde a medição de border é bugada
    measureElement:
      typeof window !== 'undefined' &&
      !navigator.userAgent.includes('Firefox')
        ? (el) => el?.getBoundingClientRect().height
        : undefined,
    overscan: 8,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
        <LoadingSpinner />
        <span className="ml-2">Carregando...</span>
      </div>
    );
  }

  if (errorState) return <>{errorState}</>;

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={containerRef}
        onScroll={onScroll}
        style={{ height, overflow: 'auto', position: 'relative' }}
        className="rounded-md border border-border"
      >
        {/* CSS grid obrigatório para dynamic row heights no TanStack Virtual */}
        <table style={{ display: 'grid', width: '100%' }}>
          <thead
            style={{
              display: 'grid',
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
            className="bg-background border-b border-border"
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} style={{ display: 'flex', width: '100%' }}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ display: 'flex', width: header.getSize() }}
                    className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider select-none"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <SortIcon direction={header.column.getIsSorted()} />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody
            style={{
              display: 'grid',
              // Altura total virtual — diz ao scrollbar o tamanho real da tabela
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }}
          >
            {rows.length === 0 && !isFetchingNextPage ? (
              <tr style={{ display: 'flex' }}>
                <td className="px-4 py-12 text-sm text-muted-foreground text-center w-full">
                  {emptyState ?? 'Nenhum resultado encontrado.'}
                </td>
              </tr>
            ) : (
              rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<T>;
                return (
                  <tr
                    key={row.id}
                    data-index={virtualRow.index}
                    ref={(node) => rowVirtualizer.measureElement(node)}
                    style={{
                      display: 'flex',
                      position: 'absolute',
                      // translateY em vez de top para performance (evita reflow)
                      transform: `translateY(${virtualRow.start}px)`,
                      width: '100%',
                    }}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        style={{ display: 'flex', width: cell.column.getSize() }}
                        className="px-4 py-3 text-sm text-foreground items-center"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Indicador de carregamento no fundo */}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-3 text-sm text-muted-foreground">
          <LoadingSpinner size="sm" />
          <span className="ml-2">Carregando mais...</span>
        </div>
      )}
    </div>
  );
}
