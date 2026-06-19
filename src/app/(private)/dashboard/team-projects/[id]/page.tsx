import { ProjectDetails } from '@/components/Dashboard/TeamProject';

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProjectDetails projectId={params.id} />;
}
