'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Portfólios</Link>
        </li>
        <li>
          <Link href="/about">Sobre</Link>
        </li>

        {!session && (
          <>
            <li>
              <Link href="/register">Registrar</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </>
        )}

        {session && (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={() => signOut()}>Sair</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
