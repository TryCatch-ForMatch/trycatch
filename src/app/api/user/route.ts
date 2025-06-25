import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';

export async function GET() {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;
  const users = await prisma.user.findMany({
    include: {
      skills: {
        include: { skill: true },
      },
    },
  });

  return Response.json(users);
}
