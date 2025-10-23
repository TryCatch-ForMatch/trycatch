import BasePage from '@/components/Dashboard/BasePage';
import { ProjectDetails } from '@/components/Dashboard/TeamProject';

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <BasePage>
      <ProjectDetails projectId={params.id} />
    </BasePage>
  );
}
