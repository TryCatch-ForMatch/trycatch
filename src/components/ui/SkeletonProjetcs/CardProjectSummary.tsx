import { Skeleton } from '@/components/ui/skeleton';

export function CardProjectSummarySkeleton() {
  return (
    <div className="rounded-md border p-4">
      <Skeleton className="mb-2 h-5 w-2/3" />

      <div className="mb-2 flex gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-6 w-6" />
        ))}
      </div>

      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>

      <div className="mt-3 flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
