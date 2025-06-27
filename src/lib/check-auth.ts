import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { NextResponse } from 'next/server';

type Role = 'ADMIN' | 'USER';

type CheckAuthParams = {
  allowedRoles?: Role[];
  requireAdmin?: boolean;
};

export async function checkAuth(params?: CheckAuthParams) {
  const session = await getServerSession(authOptions);
  console.log('Sessão ativa:', session?.user);

  if (!session) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      ),
    };
  }

  // Caso tenha passado requireAdmin
  if (params?.requireAdmin && session.user.role !== 'ADMIN') {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Apenas administradores têm acesso.' },
        { status: 403 }
      ),
    };
  }

  // Caso tenha passado allowedRoles
  if (
    params?.allowedRoles &&
    !params.allowedRoles.includes(session.user.role as Role)
  ) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Acesso negado.' }, { status: 403 }),
    };
  }
  return {
    authorized: true,
    session,
  };
}
