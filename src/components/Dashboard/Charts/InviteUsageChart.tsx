'use client';

import { useEffect, useState } from 'react';
import BaseDonutChart from '@/components/BaseCharts/BaseDonutChart';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type InviteMetrics = {
  total: number;
  used: number;
};

export default function InviteUsageChart() {
  const [data, setData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await apiTryCatch.get('/metrics');
        const invites: InviteMetrics = res.data.invites;

        const notUsed = invites.total - invites.used;

        setData([
          { label: 'Usados', value: invites.used },
          { label: 'Não usados', value: notUsed },
        ]);
      } catch (err) {
        console.log(err);
        setError('Erro ao carregar dados dos convites.');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Uso de Convites</CardTitle>
        </CardHeader>
        <CardContent>Carregando...</CardContent>
      </Card>
    );
  }
  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Uso de Convites</CardTitle>
        </CardHeader>
        <CardContent className="text-red-500">{error}</CardContent>
      </Card>
    );
  }

  return (
    <BaseDonutChart
      title="Uso de Convites"
      data={data}
      nameKey="label"
      dataKey="value"
    />
  );
}
