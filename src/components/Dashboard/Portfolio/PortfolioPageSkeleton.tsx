export function PortfolioPageSkeleton() {
  return (
    <main className="container mx-auto max-w-2xl animate-pulse space-y-6 px-4 py-10">
      <div className="h-7 w-40 rounded bg-muted" />
      <div className="space-y-4 rounded-xl border border-border bg-card p-5">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-10 rounded bg-muted" />
      </div>
      <div className="space-y-4 rounded-xl border border-border bg-card p-5">
        <div className="h-4 w-28 rounded bg-muted" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div className="space-y-1.5">
              <div className="h-3.5 w-24 rounded bg-muted" />
              <div className="h-3 w-40 rounded bg-muted" />
            </div>
            <div className="h-5 w-9 rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </main>
  );
}
