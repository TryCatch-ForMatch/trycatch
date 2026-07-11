'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import BaseDonutChart from '@/components/ui/BaseCharts/BaseDonutChart';

type ProjectStatusData = {
  status: string;
  count: number;
};

export default function ProjectsStatusChart() {
  const [data, setData] = useState<ProjectStatusData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiTryCatch.get('/metrics');
        setData(res.data.projectsByStatus || []);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar dados de projetos por status.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Projetos por Status</CardTitle>
        </CardHeader>
        <CardContent>Carregando...</CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Projetos por Status</CardTitle>
        </CardHeader>
        <CardContent className="text-red-500">{error}</CardContent>
      </Card>
    );
  }

  // Mapeia "status" -> labels amigáveis
  const formattedData = data.map((item) => ({
    ...item,
    statusLabel:
      item.status === 'BUSCANDO'
        ? 'Aberto'
        : item.status === 'EM_ANDAMENTO'
          ? 'Em Produção'
          : item.status === 'CONCLUIDO'
            ? 'Finalizado'
            : item.status,
  }));

  return (
    <BaseDonutChart<ProjectStatusData & { statusLabel: string }>
      title="Projetos por Status"
      data={formattedData}
      dataKey="count"
      nameKey="statusLabel"
    />
  );
}
