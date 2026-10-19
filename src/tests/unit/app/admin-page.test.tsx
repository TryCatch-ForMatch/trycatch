/**
 * @jest-environment node
 */

import AdminPage from '@/app/(private)/dashboard/admin-page/page';
import { checkAuth } from '@/lib/check-auth';
import { getAdminCounts, getAdminMetrics } from '@/lib/admin-metrics';
import { redirect } from 'next/navigation';

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

jest.mock('@/lib/admin-metrics', () => ({
  getAdminCounts: jest.fn(),
  getAdminMetrics: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(() => {
    throw new Error('NEXT_REDIRECT');
  }),
}));

jest.mock('@/components/Dashboard/Charts/TopUserSkillsChart', () => () => null);
jest.mock(
  '@/components/Dashboard/Charts/TopProjectSkillsChart',
  () => () => null
);
jest.mock(
  '@/components/Dashboard/Charts/ProjectsStatusChart',
  () => () => null
);
jest.mock('@/components/Dashboard/Charts/UsersGrowthChart', () => () => null);
jest.mock('@/components/Dashboard/Charts/InviteUsageChart', () => () => null);

describe('AdminPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redireciona quem não é administrador sem buscar as métricas', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({ authorized: false });

    await expect(AdminPage()).rejects.toThrow('NEXT_REDIRECT');

    expect(checkAuth).toHaveBeenCalledWith({ requireAdmin: true });
    expect(redirect).toHaveBeenCalledWith('/dashboard');
    expect(getAdminCounts).not.toHaveBeenCalled();
    expect(getAdminMetrics).not.toHaveBeenCalled();
  });

  it('busca as métricas para administradores', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: true,
      session: { user: { id: 'admin-1', role: 'ADMIN' } },
    });
    (getAdminCounts as jest.Mock).mockResolvedValue({
      projects: 1,
      users: 2,
      openInvites: 3,
      skills: 4,
      stacks: 5,
    });
    (getAdminMetrics as jest.Mock).mockResolvedValue({
      topUserSkills: [],
      topProjectSkills: [],
      stacksInProjects: [],
      usersGrowthByMonth: [],
      projectsByMonth: [],
      projectsByStatus: [],
      invites: { total: 0, used: 0 },
      rolesDistribution: [],
    });

    await AdminPage();

    expect(redirect).not.toHaveBeenCalled();
    expect(getAdminCounts).toHaveBeenCalledTimes(1);
    expect(getAdminMetrics).toHaveBeenCalledTimes(1);
  });
});
