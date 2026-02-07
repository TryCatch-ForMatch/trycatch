'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import BaseBarChart from '@/components/ui/BaseCharts/BaseBarChart';

type TopProjectSkill = {
  skill: string;
  count: number;
};

export default function TopProjectSkillsChart() {
  const [data, setData] = useState<TopProjectSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiTryCatch.get('/metrics');
        setData(res.data.topProjectSkills || []);
      } catch (err) {
        setError('Erro ao carregar dados das skills dos projetos.');
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
          <CardTitle>Skills mais requisitadas</CardTitle>
        </CardHeader>
        <CardContent>Carregando...</CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Skills mais requisitadas</CardTitle>
        </CardHeader>
        <CardContent className="text-red-500">{error}</CardContent>
      </Card>
    );
  }

  return (
    <BaseBarChart
      title="Skills mais requisitadas pelos projetos"
      data={data}
      yKey="skill" // eixo categórico correto para layout vertical
      layout="vertical"
      height={260}
      bars={[{ key: 'count', label: 'Quantidade' }]}
    />
  );
}
