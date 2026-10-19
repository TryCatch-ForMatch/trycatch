export default function AdminLoading() {
  return (
    <div className="p-10" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando painel administrativo</span>
      <div className="h-8 w-64 animate-pulse rounded bg-muted" />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
