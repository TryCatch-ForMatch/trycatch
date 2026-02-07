'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type RechartsDatum = Record<string, unknown>;

type DonutChartProps<T extends RechartsDatum> = {
  title: string;
  data: T[];
  dataKey: keyof T;
  nameKey: keyof T;
  height?: number;
  colors?: string[];
};

export default function BaseDonutChart<T extends RechartsDatum>({
  title,
  data,
  dataKey,
  nameKey,
  height = 320,
  colors,
}: DonutChartProps<T>) {
  // Style guide
  const defaultColors = [
    '#3B38A0',
    '#5C5C65',
    '#35343C',
    '#101014',
    '#A6A6AA',
    '#D9D9ED',
    '#EAEAEB',
  ];

  const chartColors = colors || defaultColors;

  // Total para cálculo de porcentagem
  const total = data.reduce((sum, item) => {
    const n = Number(item[dataKey]);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <Card className="w-full" style={{ height }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex h-[88%] items-center gap-4 px-2 pt-0 pb-2">
        {/* ---------------- GRÁFICO ---------------- */}
        <div className="h-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey={String(dataKey)}
                nameKey={String(nameKey)}
                cx="50%"
                cy="50%"
                innerRadius="45%"
                outerRadius="80%"
                paddingAngle={2}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>

              <Tooltip wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ---------------- LEGENDA ---------------- */}
        <div className="flex w-40 flex-col gap-3">
          {data.map((item, index) => {
            const value = Number(item[dataKey]);
            const percent =
              total > 0 ? ((value / total) * 100).toFixed(1) : '0';

            return (
              <div key={index} className="flex items-center gap-3">
                {/* Bolinha de cor */}
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: chartColors[index % chartColors.length],
                  }}
                />

                <div className="flex flex-col leading-tight">
                  {/* Nome */}
                  <span className="text-sm font-medium">
                    {String(item[nameKey])}
                  </span>

                  {/* Valor + porcentagem */}
                  <span className="text-xs text-muted-foreground">
                    {value} ({percent}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
