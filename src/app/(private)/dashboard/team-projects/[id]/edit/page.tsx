import { ProjectForm } from '@/components/Dashboard/TeamProject';

export default function ProjectEditPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProjectForm editIdProp={params.id} />;
}
