import { ProjectDetails } from '@/components/Dashboard/TeamProject';

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProjectDetails projectId={id} />;
}
