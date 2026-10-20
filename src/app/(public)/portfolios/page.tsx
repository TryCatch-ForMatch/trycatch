'use client';

import { useState } from 'react';
import { InfiniteCards } from '@/components/shared/InfiniteCards';
import { PortfolioCard } from '@/components/Portfolio/PortfolioCard';
import { Input } from '@/components/ui/input';
import type { PortfolioSummaryItem } from '@/types/portfolio.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filters } from './models';
import { usePortfoliosInfiniteScroll } from './hooks/usePortfoliosInfiniteScroll';

export default function PortfoliosPage() {
  const [filters, setFilters] = useState<Filters>({
    name: '',
    role: '',
    skills: '',
  });

  function handleFilterChange(key: keyof Filters, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const {
    containerRef,
    error,
    fetchMoreOnBottomReached,
    flatData,
    isFetchingNextPage,
    isLoading,
  } = usePortfoliosInfiniteScroll(filters);

  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold">Portfólios</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {flatData.length} perfis carregados
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Input
          type="text"
          aria-label="Buscar por nome"
          placeholder="Buscar por nome..."
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
          className="w-52"
        />
        <Select
          value={filters.role || 'ALL'}
          onValueChange={(value) =>
            handleFilterChange('role', value === 'ALL' ? '' : value)
          }
        >
          <SelectTrigger aria-label="Filtrar por perfil" className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos os perfis</SelectItem>
            <SelectItem value="USER">Devs</SelectItem>
            <SelectItem value="MENTOR">Mentores</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          aria-label="Buscar por skill"
          placeholder="Buscar por skill..."
          value={filters.skills}
          onChange={(e) => handleFilterChange('skills', e.target.value)}
          className="w-72"
        />
      </div>

      <InfiniteCards<PortfolioSummaryItem>
        data={flatData}
        containerRef={containerRef}
        onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        keyExtractor={(item) => item.username}
        renderItem={(item) => <PortfolioCard portfolio={item} />}
        emptyState={
          <div className="space-y-1 text-center">
            <p className="font-medium">Nenhum portfólio encontrado</p>
            <p className="text-xs text-muted-foreground">
              Tente ajustar os filtros
            </p>
          </div>
        }
        errorState={
          error && (
            <div className="flex flex-col items-center justify-center space-y-3 py-16 text-center">
              <p className="text-sm font-medium text-destructive">
                Erro ao carregar portfólios
              </p>
              <p className="text-xs text-muted-foreground">
                Tente recarregar a página ou volte mais tarde.
              </p>
            </div>
          )
        }
      />
    </main>
  );
}
