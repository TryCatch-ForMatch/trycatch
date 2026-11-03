/**
 * @jest-environment node
 */

import type { JWT } from 'next-auth/jwt';
import type { User } from 'next-auth';
import { compare } from 'bcryptjs';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

type Authorize = (
  credentials: Record<string, string> | undefined
) => Promise<User | null>;

type JwtCallback = (params: { token: JWT; user?: User }) => Promise<JWT>;

const authorize = (
  authOptions.providers[0] as unknown as { options: { authorize: Authorize } }
).options.authorize;

const jwt = authOptions.callbacks!.jwt as unknown as JwtCallback;

const GENERIC_ERROR = 'Erro ao autenticar. Verifique suas credenciais.';
const FIVE_MINUTES = 5 * 60 * 1000;

const activeUser = {
  id: 'user-1',
  name: 'Pessoa Teste',
  email: 'pessoa@teste.com',
  password: 'hash',
  avatar: null,
  role: 'USER',
  isActive: true,
};

describe('authOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authorize', () => {
    const credentials = { email: 'pessoa@teste.com', password: 'senha' };

    it('autentica uma conta ativa com a senha correta', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(activeUser);
      (compare as jest.Mock).mockResolvedValue(true);

      await expect(authorize(credentials)).resolves.toMatchObject({
        id: 'user-1',
        role: 'USER',
      });
    });

    it('recusa uma conta inativa', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        ...activeUser,
        isActive: false,
      });
      (compare as jest.Mock).mockResolvedValue(true);

      await expect(authorize(credentials)).rejects.toThrow(GENERIC_ERROR);
    });

    it('usa a mesma mensagem para e-mail inexistente, senha errada e conta inativa', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(authorize(credentials)).rejects.toThrow(GENERIC_ERROR);

      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(activeUser);
      (compare as jest.Mock).mockResolvedValueOnce(false);
      await expect(authorize(credentials)).rejects.toThrow(GENERIC_ERROR);

      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
        ...activeUser,
        isActive: false,
      });
      (compare as jest.Mock).mockResolvedValueOnce(true);
      await expect(authorize(credentials)).rejects.toThrow(GENERIC_ERROR);
    });
  });

  describe('jwt', () => {
    const baseToken = {
      id: 'user-1',
      name: 'Pessoa Teste',
      email: 'pessoa@teste.com',
      role: 'USER',
    } as JWT;

    it('registra o momento da conferência no login', async () => {
      const token = await jwt({
        token: { ...baseToken },
        user: { ...activeUser, avatar: undefined } as unknown as User,
      });

      expect(token.activeCheckedAt).toEqual(expect.any(Number));
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it('não consulta o banco antes de passar o intervalo', async () => {
      await jwt({ token: { ...baseToken, activeCheckedAt: Date.now() } });

      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it('confere a conta depois do intervalo e mantém a sessão se estiver ativa', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        isActive: true,
      });
      const old = Date.now() - FIVE_MINUTES - 1000;

      const token = await jwt({
        token: { ...baseToken, activeCheckedAt: old },
      });

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        select: { isActive: true },
      });
      expect(token.activeCheckedAt).toBeGreaterThan(old);
    });

    it('encerra a sessão de uma conta desativada', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        isActive: false,
      });

      await expect(
        jwt({ token: { ...baseToken, activeCheckedAt: 0 } })
      ).rejects.toThrow();
    });

    it('encerra a sessão de uma conta que não existe mais', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(jwt({ token: { ...baseToken } })).rejects.toThrow();
    });
  });
});
