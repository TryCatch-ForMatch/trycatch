/**
 * @jest-environment node
 */

import { getAdminMetrics } from '@/lib/admin-metrics';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    userSkill: { groupBy: jest.fn().mockResolvedValue([]) },
    projectSkill: { groupBy: jest.fn().mockResolvedValue([]) },
    projectStack: { groupBy: jest.fn().mockResolvedValue([]) },
    skill: { findMany: jest.fn().mockResolvedValue([]) },
    stack: { findMany: jest.fn().mockResolvedValue([]) },
    user: { findMany: jest.fn(), groupBy: jest.fn().mockResolvedValue([]) },
    project: { findMany: jest.fn(), groupBy: jest.fn().mockResolvedValue([]) },
    invite: { count: jest.fn().mockResolvedValue(0) },
  },
}));

describe('getAdminMetrics', () => {
  beforeEach(() => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      { createdAt: new Date(2026, 0, 10), role: 'USER' },
      { createdAt: new Date(2026, 2, 5), role: 'MENTOR' },
    ]);
    (prisma.project.findMany as jest.Mock).mockResolvedValue([
      { createdAt: new Date(2026, 1, 1) },
      { createdAt: new Date(2026, 3, 1) },
    ]);
  });

  it('busca usuários e projetos em ordem cronológica', async () => {
    await getAdminMetrics();

    expect(prisma.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { createdAt: 'asc' } })
    );
    expect(prisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { createdAt: 'asc' } })
    );
  });

  it('mantém os meses na ordem em que chegam do banco', async () => {
    const metrics = await getAdminMetrics();

    expect(metrics.usersGrowthByMonth.map((entry) => entry.month)).toEqual([
      '2026-01',
      '2026-03',
    ]);
    expect(metrics.projectsByMonth.map((entry) => entry.period)).toEqual([
      '2026-02',
      '2026-04',
    ]);
  });
});
