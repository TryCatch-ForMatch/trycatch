import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { getAdminMetrics } from '@/lib/admin-metrics';

export async function GET() {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  return NextResponse.json(await getAdminMetrics());
}
