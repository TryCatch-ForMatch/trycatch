import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProjectDetailsSkeleton() {
  return (
    <div
      role="status"
      aria-label="Carregando detalhes do projeto"
      className="mx-auto flex max-w-6xl flex-col gap-6 p-4 md:p-6 lg:p-8"
    >
      <Card className="gap-0 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-7 w-64 max-w-full sm:h-8" />
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </Card>

      <Card className="gap-0 rounded-2xl bg-muted/70 p-4 shadow-none sm:p-5">
        <Skeleton className="mb-3 h-3 w-16" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-full" />
          ))}
        </div>
      </Card>

      <Card className="gap-0 rounded-2xl p-5">
        <Skeleton className="mb-3 h-3 w-24" />
        <div className="max-w-4xl space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Card>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="rounded-xl">
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
