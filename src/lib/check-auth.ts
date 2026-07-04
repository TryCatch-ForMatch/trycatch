import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { NextResponse, NextRequest } from 'next/server';
import { Role } from '@/lib/roles';
import { logger } from '@/lib/logger';

type CheckAuthParams = {
  allowedRoles?: Role[];
  requireAdmin?: boolean;
  req?: NextRequest;
};

export async function checkAuth(params?: CheckAuthParams) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    logger.info('Sessão ativa', 'checkAuth', {
      userId: session.user.id,
      role: session.user.role,
    });
  }

  if (!session) {
    logger.warn('Sessão ausente', 'checkAuth');

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
    logger.warn('Acesso administrativo negado', 'checkAuth', {
      userId: session.user.id,
      role: session.user.role,
    });

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
    logger.warn('Acesso negado por perfil', 'checkAuth', {
      userId: session.user.id,
      role: session.user.role,
      allowedRoles: params.allowedRoles,
    });

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
