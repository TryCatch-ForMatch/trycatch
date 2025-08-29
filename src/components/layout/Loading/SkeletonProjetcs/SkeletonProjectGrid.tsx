import { CardProjectSummarySkeleton } from './CardProjectSumary';
export function ProjectSummarySkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <CardProjectSummarySkeleton key={i} />
      ))}
    </div>
  );
}
