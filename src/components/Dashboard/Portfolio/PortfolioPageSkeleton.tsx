export function PortfolioPageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-10 max-w-2xl space-y-6 animate-pulse">
      <div className="h-7 bg-muted rounded w-40" />
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="h-4 bg-muted rounded w-32" />
        <div className="h-10 bg-muted rounded" />
      </div>
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="h-4 bg-muted rounded w-28" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div className="space-y-1.5">
              <div className="h-3.5 bg-muted rounded w-24" />
              <div className="h-3 bg-muted rounded w-40" />
            </div>
            <div className="h-5 w-9 bg-muted rounded-full" />
          </div>
        ))}
      </div>
    </main>
  );
}
