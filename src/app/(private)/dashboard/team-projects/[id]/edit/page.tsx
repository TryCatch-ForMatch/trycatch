import { ProjectForm } from '@/components/Dashboard/TeamProject';

export default async function ProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProjectForm editIdProp={id} />;
}
