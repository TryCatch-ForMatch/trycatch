export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted" />
        <div className="space-y-1.5 flex-1">
          <div className="h-3 bg-muted rounded w-3/4" />
          <div className="h-2.5 bg-muted rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2.5 bg-muted rounded w-full" />
        <div className="h-2.5 bg-muted rounded w-5/6" />
      </div>
      <div className="flex gap-2 pt-1">
        <div className="h-5 w-12 bg-muted rounded-full" />
        <div className="h-5 w-16 bg-muted rounded-full" />
        <div className="h-5 w-10 bg-muted rounded-full" />
      </div>
    </div>
  );
}
