'use client';

import BaseDonutChart from '@/components/ui/BaseCharts/BaseDonutChart';
import type { ProjectStatusCount } from '@/lib/admin-metrics';

const STATUS_LABELS: Record<string, string> = {
  BUSCANDO: 'Aberto',
  EM_ANDAMENTO: 'Em Produção',
  CONCLUIDO: 'Finalizado',
};

export default function ProjectsStatusChart({
  data,
}: {
  data: ProjectStatusCount[];
}) {
  const formattedData = data.map((item) => ({
    ...item,
    statusLabel: STATUS_LABELS[item.status] ?? item.status,
  }));

  return (
    <BaseDonutChart<ProjectStatusCount & { statusLabel: string }>
      title="Projetos por Status"
      data={formattedData}
      dataKey="count"
      nameKey="statusLabel"
    />
  );
}
