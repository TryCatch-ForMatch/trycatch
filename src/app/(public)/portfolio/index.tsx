'use client';

import { useState, useMemo } from 'react';
import { usePortfolios } from '@/hooks/api/usePortfolios';
import { UserPortfolioCard } from '@/components/layout/UserPortfolioCard/UserPortfolioCard';
import { Input } from '@/components/ui/input';

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
    <main className="space-y-10 p-10">
      <h1 className="text-2xl font-medium">Portfólios</h1>

      <Input
        placeholder="Buscar por skill ou role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <div className="mr-10 ml-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
          {filteredPortfolios.map((user) => (
            <UserPortfolioCard key={user.id} data={user} />
          ))}
        </div>
      )}
    </main>
  );
}
