export function CardProjectSummarySkeleton() {
  return (
    <div className="cursor-pointer rounded-xl border p-4">
      {/* Nome do projeto */}
      <div className="mb-2 h-5 w-2/3 animate-pulse rounded bg-gray-200"></div>

      {/* Ícones das skills */}
      <div className="mb-2 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-6 w-6 animate-pulse rounded bg-gray-200"
          ></div>
        ))}
      </div>

      {/* Descrição resumida */}
      <div className="space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-gray-200"></div>
        <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* Rodapé com infos */}
      <div className="mt-3 flex justify-between text-sm text-gray-500">
        <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
        <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
