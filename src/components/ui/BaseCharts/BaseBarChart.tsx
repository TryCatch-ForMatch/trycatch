'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

type BaseBarChartProps = {
  title: string;
  data: Record<string, unknown>[];
  rawData?: Record<string, unknown>[];
  xKey?: string; // opcional e inteligente
  yKey?: string; // opcional e inteligente
  bars: { key: string; label?: string; color?: string }[];
  filterByMonth?: boolean;
  layout?: 'vertical' | 'horizontal';
  height?: number;
  colors?: string[]; // NOVO: sobrescrever paleta do style guide
  formatCategoryLabel?: (value: string) => string;
};

export default function BaseBarChart({
  title,
  data,
  rawData,
  xKey,
  yKey,
  bars,
  filterByMonth = false,
  height = 320,
  layout = 'horizontal',
  colors,
  formatCategoryLabel,
}: BaseBarChartProps) {
  const [selectedMonth, setSelectedMonth] = useState('all');

  // 🎨 Paleta do style guide
  const styleGuideColors = [
    '#3B38A0',
    '#5C5C65',
    '#35343C',
    '#101014',
    '#A6A6AA',
    '#D9D9ED',
    '#EAEAEB',
  ];

  // Se o usuário quiser passar outras cores, ele pode — senão usa nossa paleta oficial
  const chartColors = colors || styleGuideColors;

  // Extrai meses automaticamente
  const source = rawData || data;

  const months = useMemo(() => {
    const hasMonth = source.some((d) => typeof d.month === 'string');
    return hasMonth ? [...new Set(source.map((d) => d.month as string))] : [];
  }, [source]);

  const filteredData = useMemo(() => {
    if (!filterByMonth || selectedMonth === 'all') return data;
    const filtered = (rawData || data).filter((d) => d.month === selectedMonth);

    if (rawData && Array.isArray(rawData)) {
      const roles = Object.keys(rawData[0] ?? {}).filter((k) => k !== 'month');

      return roles.map((role) => ({
        role: formatCategoryLabel ? formatCategoryLabel(role) : role,
        total: filtered.reduce(
          (acc, item) => acc + (Number(item[role]) || 0),
          0
        ),
      }));
    }

    return data;
  }, [data, rawData, selectedMonth, filterByMonth, formatCategoryLabel]);

  return (
    <Card className="w-full" style={{ height }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>

        {filterByMonth && months.length > 0 && (
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filtrar mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os meses</SelectItem>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>

      <CardContent className="flex h-[88%] items-center px-2 pt-0 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData}
            layout={layout}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            {/* EIXOS */}
            {layout === 'horizontal' && (
              <>
                <XAxis
                  dataKey={xKey}
                  type="category"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    formatCategoryLabel
                      ? formatCategoryLabel(String(value))
                      : String(value)
                  }
                />
                <YAxis type="number" tick={{ fontSize: 12 }} />
              </>
            )}

            {layout === 'vertical' && (
              <>
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey={yKey}
                  type="category"
                  width={100}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    formatCategoryLabel
                      ? formatCategoryLabel(String(value))
                      : String(value)
                  }
                />
              </>
            )}

            <Tooltip />

            {/* BARRAS — agora usam automaticamente a paleta oficial */}
            {bars.map((bar, index) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                fill={bar.color ?? chartColors[index % chartColors.length]}
                name={bar.label}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
