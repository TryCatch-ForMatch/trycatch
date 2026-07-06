/**
 * @jest-environment node
 */

import { checkAuth } from '@/lib/check-auth';
import { logger } from '@/lib/logger';
import { getServerSession } from 'next-auth';

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('@/lib/auth', () => ({
  authOptions: {},
}));

jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe('checkAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve registrar aviso quando a sessão estiver ausente', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);

    const result = await checkAuth();
    const body = await result.response?.json();

    expect(result.authorized).toBe(false);
    expect(result.response?.status).toBe(401);
    expect(body).toEqual({ error: 'Não autenticado' });
    expect(logger.warn).toHaveBeenCalledWith('Sessão ausente', 'checkAuth');
  });

  it('deve registrar sessão ativa quando o usuário estiver autenticado', async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: 'user-1', role: 'ADMIN' },
    });

    const result = await checkAuth({ requireAdmin: true });

    expect(result.authorized).toBe(true);
    expect(result.session?.user.id).toBe('user-1');
    expect(logger.info).toHaveBeenCalledWith('Sessão ativa', 'checkAuth', {
      userId: 'user-1',
      role: 'ADMIN',
    });
  });

  it('deve registrar aviso quando acesso administrativo for negado', async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: 'user-2', role: 'USER' },
    });

    const result = await checkAuth({ requireAdmin: true });

    expect(result.authorized).toBe(false);
    expect(result.response?.status).toBe(403);
    expect(logger.warn).toHaveBeenCalledWith(
      'Acesso administrativo negado',
      'checkAuth',
      {
        userId: 'user-2',
        role: 'USER',
      }
    );
  });

  it('deve registrar aviso quando o perfil não estiver autorizado', async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: 'user-3', role: 'USER' },
    });

    const result = await checkAuth({ allowedRoles: ['ADMIN'] });

    expect(result.authorized).toBe(false);
    expect(result.response?.status).toBe(403);
    expect(logger.warn).toHaveBeenCalledWith(
      'Acesso negado por perfil',
      'checkAuth',
      {
        userId: 'user-3',
        role: 'USER',
        allowedRoles: ['ADMIN'],
      }
    );
  });
});
