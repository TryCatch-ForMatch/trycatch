import { prisma } from '@/lib/prisma';

export async function getDashboardSkillsCount(userId: string) {
  return prisma.userSkill.count({
    where: {
      userId,
    },
  });
}
