import { compare } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { ROLE_GROUPS, Role } from '@/lib/roles';
import { prisma } from '@/lib/prisma';

// A sessão é um JWT e vale por dias. Para que desativar uma conta tenha efeito
// sem esperar a sessão expirar, a conta é conferida de novo neste intervalo.
const ACTIVE_CHECK_INTERVAL_MS = 5 * 60 * 1000;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
            // Única exceção ao `omit` global definido em src/lib/prisma.ts:
            // aqui o hash é necessário para validar a senha.
            omit: { password: false },
          });

          if (!user) throw new Error('Email não encontrado.');

          const isValid = await compare(credentials!.password, user.password);

          if (!isValid) throw new Error('Senha incorreta.');

          if (!user.isActive) throw new Error('Conta inativa.');

          const validRoles = ROLE_GROUPS.ALL;
          const role = validRoles.includes(user.role as Role)
            ? (user.role as Role)
            : 'USER';

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar ?? undefined,
            role,
          };

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          throw new Error('Erro ao autenticar. Verifique suas credenciais.');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.avatar = user.avatar;
        token.activeCheckedAt = Date.now();
        return token;
      }

      const userId = typeof token.id === 'string' ? token.id : undefined;
      const lastCheck =
        typeof token.activeCheckedAt === 'number' ? token.activeCheckedAt : 0;

      if (userId && Date.now() - lastCheck > ACTIVE_CHECK_INTERVAL_MS) {
        const current = await prisma.user.findUnique({
          where: { id: userId },
          select: { isActive: true },
        });

        // Lançar erro aqui faz o NextAuth apagar o cookie da sessão:
        // a pessoa é deslogada na próxima requisição.
        if (!current?.isActive) throw new Error('Sessão de conta inativa.');

        token.activeCheckedAt = Date.now();
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.avatar = token.avatar as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/api/')) return url;
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
