import { Card, CardContent } from '@/components/ui/card';

type CountCardProps = {
  label: string;
  value: number;
};

export function CountCard({ label, value }: CountCardProps) {
  return (
    <Card className="rounded-2xl p-2 shadow">
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
