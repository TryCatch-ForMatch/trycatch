'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function StackCard() {
  const [stackCount, setStackCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchStackCount() {
      try {
        const res = await fetch('/api/tech-stack/count');
        const data = await res.json();
        setStackCount(data.count);
      } catch (error) {
        console.error('Erro ao buscar número de stacks:', error);
        setStackCount(0);
      }
    }

    fetchStackCount();
  }, []);

  return (
    <Card className="rounded-2xl p-4 shadow">
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Stacks</p>
        <p className="text-2xl font-bold">
          {stackCount !== null ? stackCount : '...'}
        </p>
      </CardContent>
    </Card>
  );
}
