import Link from 'next/link';
import { Mail, Wrench, Layers, Users, Folders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountCard } from '@/components/Dashboard/PainelCards';
import TopUserSkillsChart from '@/components/Dashboard/Charts/TopUserSkillsChart';
import TopProjectSkillsChart from '@/components/Dashboard/Charts/TopProjectSkillsChart';
import ProjectsStatusChart from '@/components/Dashboard/Charts/ProjectsStatusChart';
import UsersGrowthChart from '@/components/Dashboard/Charts/UsersGrowthChart';
import InviteUsageChart from '@/components/Dashboard/Charts/InviteUsageChart';
import { getAdminCounts, getAdminMetrics } from '@/lib/admin-metrics';

const adminLinks = [
  { href: '/dashboard/admin-page/invites', label: 'Convites', icon: Mail },
  { href: '/dashboard/admin-page/skills', label: 'Skills', icon: Wrench },
  {
    href: '/dashboard/admin-page/tech-stacks',
    label: 'Tech Stacks',
    icon: Layers,
  },
  { href: '/dashboard/admin-page/users', label: 'Usuários', icon: Users },
  {
    href: '/dashboard/admin-page/ui-assets',
    label: 'UI Assets',
    icon: Folders,
  },
];

export default async function AdminPage() {
  const [counts, metrics] = await Promise.all([
    getAdminCounts(),
    getAdminMetrics(),
  ]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Painel Administrativo</h1>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <CountCard label="Projetos" value={counts.projects} />
        <CountCard label="Usuários" value={counts.users} />
        <CountCard label="Convites Abertos" value={counts.openInvites} />
        <CountCard label="Skills" value={counts.skills} />
        <CountCard label="Stacks" value={counts.stacks} />
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {adminLinks.map(({ href, label, icon: Icon }) => (
            <Button
              key={href}
              asChild
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl"
            >
              <Link href={href}>
                <Icon aria-hidden className="size-5" />
                {label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-row gap-8">
        <ProjectsStatusChart data={metrics.projectsByStatus} />
        <UsersGrowthChart data={metrics.usersGrowthByMonth} />
        <InviteUsageChart invites={metrics.invites} />
      </div>
      <div className="mt-10 flex flex-row gap-8">
        <TopUserSkillsChart data={metrics.topUserSkills} />
        <TopProjectSkillsChart data={metrics.topProjectSkills} />
      </div>
    </div>
  );
}
