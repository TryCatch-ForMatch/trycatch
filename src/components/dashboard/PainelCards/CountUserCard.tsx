'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function UserCard() {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const res = await fetch('/api/user/count');
        const data = await res.json();
        setUserCount(data.count);
      } catch (error) {
        console.error('Erro ao buscar número de usuários:', error);
        setUserCount(0);
      }
    }

    fetchUserCount();
  }, []);

  return (
    <Card className="rounded-2xl p-4 shadow">
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Usuários</p>
        <p className="text-2xl font-bold">
          {userCount !== null ? userCount : '...'}
        </p>
      </CardContent>
    </Card>
  );
}
