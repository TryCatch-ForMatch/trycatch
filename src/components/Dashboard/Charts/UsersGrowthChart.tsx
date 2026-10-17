'use client';

import { useMemo } from 'react';
import BaseBarChart from '@/components/ui/BaseCharts/BaseBarChart';
import { getRoleLabel } from '@/lib/role-labels';
import type { UsersGrowthEntry } from '@/lib/admin-metrics';

export default function UsersGrowthChart({
  data,
}: {
  data: UsersGrowthEntry[];
}) {
  const transformedData = useMemo(() => {
    if (!data.length) return [];

    const roles = Object.keys(data[0]).filter((key) => key !== 'month');

    return roles.map((role) => ({
      role,
      total: data.reduce((acc, item) => acc + (Number(item[role]) || 0), 0),
    }));
  }, [data]);

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
