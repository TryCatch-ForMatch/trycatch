import { Skeleton } from '@/components/ui/skeleton';

function CardSkeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-5">
      <Skeleton className="h-4 w-32" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-2">
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3 w-40" />
          </div>
          <Skeleton className="h-5 w-9 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function PortfolioPageSkeleton() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <CardSkeleton rows={1} />
          <CardSkeleton rows={3} />
        </div>
        <div className="space-y-6">
          <CardSkeleton rows={6} />
          <CardSkeleton rows={2} />
        </div>
      </div>
    </div>
  );
}
