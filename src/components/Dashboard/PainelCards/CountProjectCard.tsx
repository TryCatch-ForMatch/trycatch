'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/UI/card';

export function ProjectCard() {
  const [projectCount, setProjectCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProjectCount() {
      try {
        const res = await fetch('/api/team-project/count');
        const data = await res.json();
        setProjectCount(data.count);
      } catch (error) {
        console.error('Erro ao buscar número de projetos:', error);
        setProjectCount(0);
      }
    }

    fetchProjectCount();
  }, []);

  return (
    <Card className="rounded-2xl p-4 shadow">
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Projetos</p>
        <p className="text-2xl font-bold">
          {projectCount !== null ? projectCount : '...'}
        </p>
      </CardContent>
    </Card>
  );
}
