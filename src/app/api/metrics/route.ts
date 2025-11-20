import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { ROLES } from '@/lib/roles';

export async function GET() {
  const session = await checkAuth({ requireAdmin: true });
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Skills mais frequentes (users)
  const userSkills = await prisma.userSkill.groupBy({
    by: ['skillId'],
    _count: { skillId: true },
    orderBy: { _count: { skillId: 'desc' } },
    take: 20,
  });

  const userSkillsNames = await prisma.skill.findMany({
    where: { id: { in: userSkills.map((s) => s.skillId) } },
    select: { id: true, name: true },
  });

  const topUserSkills = userSkills.map((s) => ({
    skill: userSkillsNames.find((n) => n.id === s.skillId)?.name || 'Unknown',
    count: s._count.skillId,
  }));

  // Skills mais exigidas (projects)
  const projectSkills = await prisma.projectSkill.groupBy({
    by: ['skillId'],
    _count: { skillId: true },
    orderBy: { _count: { skillId: 'desc' } },
    take: 20,
  });

  const projectSkillsNames = await prisma.skill.findMany({
    where: { id: { in: projectSkills.map((s) => s.skillId) } },
    select: { id: true, name: true },
  });

  const topProjectSkills = projectSkills.map((s) => ({
    skill:
      projectSkillsNames.find((n) => n.id === s.skillId)?.name || 'Unknown',
    count: s._count.skillId,
  }));

  // Stacks mais presentes nos projetos
  const stacksInProjectsGroup = await prisma.projectStack.groupBy({
    by: ['stackId'],
    _count: { stackId: true },
  });

  const stacksNames = await prisma.stack.findMany({
    where: { id: { in: stacksInProjectsGroup.map((s) => s.stackId) } },
    select: { id: true, name: true },
  });

  const stacksInProjects = stacksInProjectsGroup.map((s) => ({
    stack: stacksNames.find((n) => n.id === s.stackId)?.name || 'Unknown',
    count: s._count.stackId,
  }));

  // Crescimento de usuários por mês
  const users = await prisma.user.findMany({
    select: { id: true, createdAt: true, role: true },
  });

  const allRoles = Object.values(ROLES);

  const usersGrowthByMonth: Record<string, { [role: string]: number }> = {};

  users.forEach((u) => {
    const month = `${u.createdAt.getFullYear()}-${String(u.createdAt.getMonth() + 1).padStart(2, '0')}`;
    // Se ainda não existe o registro daquele mês, inicializa todas as roles com 0
    if (!usersGrowthByMonth[month]) {
      usersGrowthByMonth[month] = {};

      allRoles.forEach((role) => {
        usersGrowthByMonth[month][role] = 0;
      });
    }
    usersGrowthByMonth[month][u.role]++;
  });

  const usersByMonth = Object.entries(usersGrowthByMonth).map(
    ([month, roles]) => ({
      month,
      ...roles,
    })
  );

  // Projetos por mês
  const projects = await prisma.project.findMany({
    select: { id: true, createdAt: true, status: true },
  });

  const projectsByMonthMap: Record<string, { count: number }> = {};

  projects.forEach((p) => {
    const month = `${p.createdAt.getFullYear()}-${String(p.createdAt.getMonth() + 1).padStart(2, '0')}`;
    if (!projectsByMonthMap[month]) projectsByMonthMap[month] = { count: 0 };
    projectsByMonthMap[month].count++;
  });

  const projectsByMonth = Object.entries(projectsByMonthMap).map(
    ([period, values]) => ({ period, ...values })
  );

  // Projetos por status
  const allStatus = ['BUSCANDO', 'EM_ANDAMENTO', 'CONCLUIDO'];

  const grouped = await prisma.project.groupBy({
    by: ['status'],
    _count: { status: true },
  });

  const projectsByStatus = allStatus.map((status) => {
    const found = grouped.find((g) => g.status === status);
    return {
      status,
      count: found ? found._count.status : 0,
    };
  });

  // Taxa de uso dos convites
  const totalInvites = await prisma.invite.count();
  const usedInvites = await prisma.invite.count({ where: { used: true } });

  // Distribuição de roles
  const rolesGroup = await prisma.user.groupBy({
    by: ['role'],
    _count: { role: true },
  });

  const rolesDistribution = rolesGroup.map((r) => ({
    role: r.role,
    count: r._count.role,
  }));

  return NextResponse.json({
    topUserSkills,
    topProjectSkills,
    stacksInProjects,
    usersGrowthByMonth: usersByMonth,
    projectsByMonth,
    projectsByStatus,
    invites: {
      total: totalInvites,
      used: usedInvites,
    },
    rolesDistribution,
  });
}
