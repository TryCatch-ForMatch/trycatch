'use client';

import BaseBarChart from '@/components/ui/BaseCharts/BaseBarChart';
import type { SkillCount } from '@/lib/admin-metrics';

export default function TopUserSkillsChart({ data }: { data: SkillCount[] }) {
  return (
    <BaseBarChart
      title="Skills mais frequentes entre usuários"
      data={data}
      yKey="skill"
      layout="vertical"
      height={260}
      bars={[{ key: 'count', label: 'Quantidade' }]}
    />
  );
}
