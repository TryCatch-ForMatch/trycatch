import { Skeleton } from '@/components/ui/skeleton';

export function PortfolioPageSkeleton() {
  return (
    <main className="container mx-auto max-w-2xl space-y-6 px-4 py-10">
      <Skeleton className="h-7 w-40" />
      <div className="space-y-4 rounded-xl border border-border bg-card p-5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10" />
      </div>
      <div className="space-y-4 rounded-xl border border-border bg-card p-5">
        <Skeleton className="h-4 w-28" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-5 w-9 rounded-full" />
          </div>
        ))}
      </div>
    </main>
  );
}
