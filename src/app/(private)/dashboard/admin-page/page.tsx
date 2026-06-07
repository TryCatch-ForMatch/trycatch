import { checkAuth } from '@/lib/check-auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  InviteCard,
  ProjectCard,
  SkillCard,
  StackCard,
  UserCard,
} from '@/components/Dashboard/PainelCards';
import Link from 'next/link';
import { Mail, Wrench, Layers, Users, Folders } from 'lucide-react';
import TopUserSkillsChart from '@/components/Dashboard/Charts/TopUserSkillsChart';
import TopProjectSkillsChart from '@/components/Dashboard/Charts/TopProjectSkillsChart';
import ProjectsStatusChart from '@/components/Dashboard/Charts/ProjectsStatusChart';
import UsersGrowthChart from '@/components/Dashboard/Charts/UsersGrowthChart';
import InviteUsageChart from '@/components/Dashboard/Charts/InviteUsageChart';

export default async function AdminPage() {
  const auth = await checkAuth({ requireAdmin: true });

  if (!auth.authorized) {
    redirect('/dashboard');
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Painel Administrativo</h1>

      {/* Painel com os números e status */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <ProjectCard />
        <UserCard />
        <InviteCard />
        <SkillCard />
        <StackCard />
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Link href="/dashboard/admin-page/invites">
            <Button
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl"
            >
              <Mail className="size-5" />
              Convites
            </Button>
          </Link>

          <Link href="/dashboard/admin-page/skills">
            <Button
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl"
            >
              <Wrench className="size-5" />
              Skills
            </Button>
          </Link>

          <Link href="/dashboard/admin-page/tech-stacks">
            <Button
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl"
            >
              <Layers className="size-5" />
              Tech Stacks
            </Button>
          </Link>

          <Link href="/dashboard/admin-page/users">
            <Button
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl"
            >
              <Users className="size-5" />
              Usuários
            </Button>
          </Link>

          <Link href="/dashboard/admin-page/ui-assets">
            <Button
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl"
            >
              <Folders className="size-5" />
              UI Assets
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-10 flex flex-row gap-8">
        <ProjectsStatusChart />
        <UsersGrowthChart />
        <InviteUsageChart />
      </div>
      <div className="mt-10 flex flex-row gap-8">
        <TopUserSkillsChart />
        <TopProjectSkillsChart />
      </div>
    </div>
  );
}
