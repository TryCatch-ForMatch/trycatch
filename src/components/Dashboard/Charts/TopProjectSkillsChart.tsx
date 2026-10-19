'use client';

import BaseBarChart from '@/components/ui/BaseCharts/BaseBarChart';
import type { SkillCount } from '@/lib/admin-metrics';

export default function TopProjectSkillsChart({
  data,
}: {
  data: SkillCount[];
}) {
  return (
    <BaseBarChart
      title="Skills mais requisitadas pelos projetos"
      data={data}
      yKey="skill"
      layout="vertical"
      height={260}
      bars={[{ key: 'count', label: 'Quantidade' }]}
    />
  );
}
