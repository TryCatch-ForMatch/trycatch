'use client';

import { useState, useMemo } from 'react';
import { usePortfolios } from '@/hooks/api/usePortfolios';
import { UserPortfolioCard } from '@/components/Portfolio/PortfolioCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function PortfolioPage() {
  const { portfolios, isLoading } = usePortfolios();
  const [search, setSearch] = useState('');

  const filteredPortfolios = useMemo(() => {
    if (!search.trim()) return portfolios;

    const searchLower = search.toLowerCase();

    return portfolios.filter(
      (user) =>
        user.role.toLowerCase().includes(searchLower) ||
        user.skills.some((skill) =>
          skill.name.toLowerCase().includes(searchLower)
        )
    );
  }, [portfolios, search]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Search */}
      <div className="mb-8 flex justify-center sm:mb-10 sm:justify-end">
        <div className="relative w-full max-w-sm sm:max-w-xs">
          <span className="pointer-events-none absolute top-3 left-3 text-gray-400">
            <Search className="h-4 w-4" />
          </span>

          <Input
            className="h-10 pl-10"
            placeholder="Buscar por skill ou role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="py-16 text-center text-sm text-gray-500">
          Carregando...
        </div>
      ) : (
        <div className="mx-auto grid grid-cols-1 justify-items-center gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
          {filteredPortfolios.map((user) => (
            <UserPortfolioCard key={user.id} data={user} />
          ))}
        </div>
      )}
    </main>
  );
}
