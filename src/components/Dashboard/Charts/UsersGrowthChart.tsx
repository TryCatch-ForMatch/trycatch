'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import BaseBarChart from '@/components/ui/BaseCharts/BaseBarChart';
import { getRoleLabel } from '@/lib/role-labels';

type UsersGrowthData = {
  month: string;
  [role: string]: number | string;
};

export default function UsersGrowthChart() {
  const [data, setData] = useState<UsersGrowthData[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transformedData = useMemo(() => {
    if (!data.length || !roles.length) return [];

    return roles.map((role) => ({
      role,
      total: data.reduce((acc, item) => acc + (Number(item[role]) || 0), 0),
    }));
  }, [data, roles]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiTryCatch.get('/metrics');
        const apiData = res.data.usersGrowthByMonth || [];

        setData(apiData);

        // Detecta automaticamente as roles existentes no retorno da API
        if (apiData.length > 0) {
          const detectedRoles = Object.keys(apiData[0]).filter(
            (key) => key !== 'month'
          );
          setRoles(detectedRoles);
        }
      } catch {
        setError('Erro ao carregar crescimento de usuários.');
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
          <CardTitle>Crescimento de Usuários</CardTitle>
        </CardHeader>
        <CardContent>Carregando...</CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Crescimento de Usuários</CardTitle>
        </CardHeader>
        <CardContent className="text-red-500">{error}</CardContent>
      </Card>
    );
  }

  return (
    <BaseBarChart
      title="Crescimento de Usuários por Mês"
      data={transformedData}
      rawData={data}
      xKey="role"
      filterByMonth={true}
      formatCategoryLabel={getRoleLabel}
      bars={[
        {
          key: 'total',
          label: 'Total',
        },
      ]}
    />
  );
}
