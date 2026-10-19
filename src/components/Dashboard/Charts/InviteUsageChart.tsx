'use client';

import BaseDonutChart from '@/components/ui/BaseCharts/BaseDonutChart';
import type { InviteUsage } from '@/lib/admin-metrics';

export default function InviteUsageChart({
  invites,
}: {
  invites: InviteUsage;
}) {
  const data = [
    { label: 'Usados', value: invites.used },
    { label: 'Não usados', value: invites.total - invites.used },
  ];

  return (
    <BaseDonutChart
      title="Uso de Convites"
      data={data}
      nameKey="label"
      dataKey="value"
    />
  );
}
