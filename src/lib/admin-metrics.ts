import { prisma } from '@/lib/prisma';
import { ROLES } from '@/lib/roles';

export type SkillCount = { skill: string; count: number };
export type StackCount = { stack: string; count: number };
export type UsersGrowthEntry = {
  month: string;
  [role: string]: number | string;
};
export type ProjectsByMonthEntry = { period: string; count: number };
export type ProjectStatusCount = { status: string; count: number };
export type InviteUsage = { total: number; used: number };
export type RoleCount = { role: string; count: number };

export type AdminMetrics = {
  topUserSkills: SkillCount[];
  topProjectSkills: SkillCount[];
  stacksInProjects: StackCount[];
  usersGrowthByMonth: UsersGrowthEntry[];
  projectsByMonth: ProjectsByMonthEntry[];
  projectsByStatus: ProjectStatusCount[];
  invites: InviteUsage;
  rolesDistribution: RoleCount[];
};

export type AdminCounts = {
  projects: number;
  users: number;
  openInvites: number;
  skills: number;
  stacks: number;
};

const PROJECT_STATUSES = ['BUSCANDO', 'EM_ANDAMENTO', 'CONCLUIDO'];

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

async function withSkillNames(
  grouped: { skillId: string; _count: { skillId: number } }[]
): Promise<SkillCount[]> {
  const names = await prisma.skill.findMany({
    where: { id: { in: grouped.map((s) => s.skillId) } },
    select: { id: true, name: true },
  });

  return grouped.map((s) => ({
    skill: names.find((n) => n.id === s.skillId)?.name || 'Unknown',
    count: s._count.skillId,
  }));
}

async function getTopUserSkills(): Promise<SkillCount[]> {
  const grouped = await prisma.userSkill.groupBy({
    by: ['skillId'],
    _count: { skillId: true },
    orderBy: { _count: { skillId: 'desc' } },
    take: 20,
  });

  return withSkillNames(grouped);
}

async function getTopProjectSkills(): Promise<SkillCount[]> {
  const grouped = await prisma.projectSkill.groupBy({
    by: ['skillId'],
    _count: { skillId: true },
    orderBy: { _count: { skillId: 'desc' } },
    take: 20,
  });

  return withSkillNames(grouped);
}

async function getStacksInProjects(): Promise<StackCount[]> {
  const grouped = await prisma.projectStack.groupBy({
    by: ['stackId'],
    _count: { stackId: true },
  });
  const names = await prisma.stack.findMany({
    where: { id: { in: grouped.map((s) => s.stackId) } },
    select: { id: true, name: true },
  });

  return grouped.map((s) => ({
    stack: names.find((n) => n.id === s.stackId)?.name || 'Unknown',
    count: s._count.stackId,
  }));
}

async function getUsersGrowthByMonth(): Promise<UsersGrowthEntry[]> {
  const users = await prisma.user.findMany({
    select: { createdAt: true, role: true },
  });
  const allRoles = Object.values(ROLES);
  const byMonth: Record<string, Record<string, number>> = {};

  users.forEach((u) => {
    const month = monthKey(u.createdAt);
    if (!byMonth[month]) {
      byMonth[month] = Object.fromEntries(allRoles.map((role) => [role, 0]));
    }
    byMonth[month][u.role]++;
  });

  return Object.entries(byMonth).map(([month, roles]) => ({
    month,
    ...roles,
  }));
}

async function getProjectsByMonth(): Promise<ProjectsByMonthEntry[]> {
  const projects = await prisma.project.findMany({
    select: { createdAt: true },
  });
  const byMonth: Record<string, number> = {};

  projects.forEach((p) => {
    const month = monthKey(p.createdAt);
    byMonth[month] = (byMonth[month] ?? 0) + 1;
  });

  return Object.entries(byMonth).map(([period, count]) => ({ period, count }));
}

async function getProjectsByStatus(): Promise<ProjectStatusCount[]> {
  const grouped = await prisma.project.groupBy({
    by: ['status'],
    _count: { status: true },
  });

  return PROJECT_STATUSES.map((status) => ({
    status,
    count: grouped.find((g) => g.status === status)?._count.status ?? 0,
  }));
}

async function getRolesDistribution(): Promise<RoleCount[]> {
  const grouped = await prisma.user.groupBy({
    by: ['role'],
    _count: { role: true },
  });

  return grouped.map((r) => ({ role: r.role, count: r._count.role }));
}

export async function getAdminMetrics(): Promise<AdminMetrics> {
  const [
    topUserSkills,
    topProjectSkills,
    stacksInProjects,
    usersGrowthByMonth,
    projectsByMonth,
    projectsByStatus,
    totalInvites,
    usedInvites,
    rolesDistribution,
  ] = await Promise.all([
    getTopUserSkills(),
    getTopProjectSkills(),
    getStacksInProjects(),
    getUsersGrowthByMonth(),
    getProjectsByMonth(),
    getProjectsByStatus(),
    prisma.invite.count(),
    prisma.invite.count({ where: { used: true } }),
    getRolesDistribution(),
  ]);

  return {
    topUserSkills,
    topProjectSkills,
    stacksInProjects,
    usersGrowthByMonth,
    projectsByMonth,
    projectsByStatus,
    invites: { total: totalInvites, used: usedInvites },
    rolesDistribution,
  };
}

export async function getAdminCounts(): Promise<AdminCounts> {
  const [projects, users, openInvites, skills, stacks] = await Promise.all([
    prisma.project.count(),
    prisma.user.count(),
    prisma.invite.count({ where: { used: false } }),
    prisma.skill.count(),
    prisma.stack.count(),
  ]);

  return { projects, users, openInvites, skills, stacks };
}
