import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { checkAuth } from '@/lib/check-auth';
import { ProjectForm } from '@/components/Dashboard/TeamProject';

export default async function TeamProjectNewPage() {
  const { authorized } = await checkAuth();

  if (!authorized) {
    redirect('/login');
  }

  return (
    <Suspense>
      <ProjectForm />
    </Suspense>
  );
}
