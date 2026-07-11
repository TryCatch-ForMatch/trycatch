export function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-3 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-3/4 rounded bg-muted" />
          <div className="h-2.5 w-1/2 rounded bg-muted" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2.5 w-full rounded bg-muted" />
        <div className="h-2.5 w-5/6 rounded bg-muted" />
      </div>
      <div className="flex gap-2 pt-1">
        <div className="h-5 w-12 rounded-full bg-muted" />
        <div className="h-5 w-16 rounded-full bg-muted" />
        <div className="h-5 w-10 rounded-full bg-muted" />
      </div>
    </div>
  );
}
