import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

const prisma = new PrismaClient();

type UserRole = 'ADMIN' | 'USER';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) throw new Error('Email não encontrado.');

        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) throw new Error('Senha incorreta.');

        const validRoles = ['ADMIN', 'USER'] as const;
        const role = validRoles.includes(
          user.role as (typeof validRoles)[number]
        )
          ? (user.role as UserRole)
          : 'USER';

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar ?? undefined,
          role,
        };
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
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/api/')) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
