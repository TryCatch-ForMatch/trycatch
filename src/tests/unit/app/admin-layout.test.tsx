/**
 * @jest-environment node
 */

import AdminLayout from '@/app/(private)/dashboard/admin-page/layout';
import { checkAuth } from '@/lib/check-auth';
import { redirect } from 'next/navigation';

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(() => {
    throw new Error('NEXT_REDIRECT');
  }),
}));

describe('AdminLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exige papel de administrador', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: true,
      session: { user: { id: 'admin-1', role: 'ADMIN' } },
    });

    await AdminLayout({ children: 'conteúdo' });

    expect(checkAuth).toHaveBeenCalledWith({ requireAdmin: true });
  });

  it('renderiza o conteúdo para administradores', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: true,
      session: { user: { id: 'admin-1', role: 'ADMIN' } },
    });

    const result = await AdminLayout({ children: 'conteúdo' });

    expect(result).toBe('conteúdo');
    expect(redirect).not.toHaveBeenCalled();
  });

  it('redireciona para o dashboard quem não é administrador', async () => {
    (checkAuth as jest.Mock).mockResolvedValue({ authorized: false });

    await expect(AdminLayout({ children: 'conteúdo' })).rejects.toThrow(
      'NEXT_REDIRECT'
    );
    expect(redirect).toHaveBeenCalledWith('/dashboard');
  });
});
