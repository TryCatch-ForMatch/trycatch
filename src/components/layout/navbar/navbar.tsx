'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <aside className="fixed top-0 left-0 flex h-screen w-60 flex-col justify-between border-r border-gray-300 bg-transparent px-4 py-6 backdrop-blur-md">
      {/* TOPO - Logo + Avatar */}
      <div>
        {/* Logo */}
        <div className="mb-8 text-xl font-bold text-gray-800">TryCatch</div>

        {/* Avatar + Nome do usuário */}
        {user && (
          <div className="mb-10 flex items-center gap-3">
            {user.avatar && (
              <Image
                src={user.avatar}
                alt={user.name || 'Avatar'}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span className="text-sm font-medium text-gray-700">
              {user.name}
            </span>
          </div>
        )}

        {/* Links principais */}
        <nav>
          <ul className="flex flex-col gap-4 text-sm text-gray-800">
            <li>
              <Link href="/projects" className="hover:text-blue-600">
                Projetos
              </Link>
            </li>
            <li>
              <Link href="/portfolios" className="hover:text-blue-600">
                Portfólios
              </Link>
            </li>
            <li>
              <Link href="/forum" className="hover:text-blue-600">
                Fórum
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Rodapé - Dúvidas Frequentes */}
      <div className="text-sm">
        <Link href="/faq" className="text-gray-600 hover:text-blue-600">
          Dúvidas Frequentes
        </Link>
      </div>
    </aside>
  );
}
