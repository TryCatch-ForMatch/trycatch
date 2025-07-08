'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function SkillCard() {
  const [skillCount, setSkillCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSkillCount() {
      try {
        const res = await fetch('/api/skill/count');
        const data = await res.json();
        setSkillCount(data.count);
      } catch (error) {
        console.error('Erro ao buscar número de skills:', error);
        setSkillCount(0);
      }
    }

    fetchSkillCount();
  }, []);

  return (
    <Card className="rounded-2xl p-4 shadow">
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Skills</p>
        <p className="text-2xl font-bold">
          {skillCount !== null ? skillCount : '...'}
        </p>
      </CardContent>
    </Card>
  );
}
