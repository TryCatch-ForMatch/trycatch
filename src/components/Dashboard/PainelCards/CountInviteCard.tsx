'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function InviteCard() {
  const [inviteCount, setInviteCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchInviteCount() {
      try {
        const res = await fetch('/api/invite/count');
        const data = await res.json();
        setInviteCount(data.count);
      } catch (error) {
        console.error('Erro ao buscar número de convites:', error);
        setInviteCount(0);
      }
    }

    fetchInviteCount();
  }, []);

  return (
    <Card className="rounded-2xl p-4 shadow">
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Convites Pendentes</p>
        <p className="text-2xl font-bold">
          {inviteCount !== null ? inviteCount : '...'}
        </p>
      </CardContent>
    </Card>
  );
}
