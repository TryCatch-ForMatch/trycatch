'use client';

import { useSession } from 'next-auth/react';
import { DefaultUser } from 'next-auth';

type AppUser = DefaultUser & {
  id: string;
  role: 'ADMIN' | 'USER';
  name: string;
  email: string;
};

export function useCurrentUser(): AppUser | null {
  const { data: session } = useSession();
  return (session?.user as AppUser) ?? null;
}
