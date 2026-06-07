'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Home,
  Users,
  MessageSquare,
  Bolt,
  ChevronRight,
  ChevronLeft,
  FolderKanban,
  MessageCircleQuestion,
} from 'lucide-react';
import { useSidebar } from '@/Context/SidebarContextOpenClose';

export function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`flex h-screen flex-col justify-between px-4 py-6 shadow-sm ${isOpen ? 'w-20' : 'w-60'} transition-width sticky top-0 bg-background duration-300`}
    >
      <div>
        {/* Logo */}
        <Link
          href="/dashboard"
          aria-label="Ir para a página dashboard"
          className={`${!isOpen ? 'block' : 'hidden'}`}
        >
          <div className="relative mx-auto mt-4 h-14 w-32">
            <Image
              src="/logo-trycatch-colmeia-azul.png"
              alt="TryCatch"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Avatar + Nome do usuário */}
        <Link href={'/dashboard/profile'}>
          {user && (
            <div className="mt-8 mb-8 flex items-center gap-3">
              {user.avatar && (
                <Image
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.name || 'Avatar'}
                  width={45}
                  height={45}
                  className="rounded-full"
                />
              )}
              <div className={`flex flex-col ${!isOpen ? 'block' : 'hidden'}`}>
                <span className="text-sm font-medium text-gray-800">
                  {user.name}
                </span>
                <span className="font-regular text-sm text-gray-500">
                  {user.email}
                </span>
              </div>
            </div>
          )}
        </Link>

        {/* Links principais */}
        <nav>
          <ul className="flex flex-col gap-6 text-base text-gray-800">
            <li>
              {/* Página inicial */}
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 ${!isOpen ? 'justify-start' : 'justify-center'} ${pathname === '/dashboard' ? 'rounded-sm bg-[#3B38A0] p-2 text-gray-50' : 'bg-transparent'} `}
              >
                <Home size={20} />
                <span className={`${!isOpen ? 'block' : 'hidden'}`}>
                  Página Inicial
                </span>
              </Link>
            </li>

            <li>
              {/* Projetos */}
              <Link
                href="/dashboard/team-projects"
                className={`flex items-center gap-2 ${!isOpen ? 'justify-start' : 'justify-center'} ${pathname === '/dashboard/team-projects' ? 'rounded-sm bg-[#3B38A0] p-2 text-gray-50' : 'bg-transparent'} `}
              >
                <FolderKanban size={20} />
                <span className={`${!isOpen ? 'block' : 'hidden'}`}>
                  Projetos
                </span>
              </Link>
            </li>
            <li>
              {/* Portfólio */}
              <Link
                href="/dashboard/portfolio"
                className={`flex items-center gap-2 ${!isOpen ? 'justify-start' : 'justify-center'} ${pathname === '/dashboard/portfolio' ? 'rounded-sm bg-[#3B38A0] p-2 text-gray-50' : 'bg-transparent'} `}
              >
                <Users size={20} />
                <span className={`${!isOpen ? 'block' : 'hidden'}`}>
                  Portfólio
                </span>
              </Link>
            </li>
            <li>
              {/* Fórum */}
              <Link
                href="/dashboard/forum"
                className={`flex items-center gap-2 ${!isOpen ? 'justify-start' : 'justify-center'} ${pathname === '/dashboard/forum' ? 'rounded-sm bg-[#3B38A0] p-2 text-gray-50' : 'bg-transparent'} `}
              >
                <MessageSquare size={20} />
                <span className={`${!isOpen ? 'block' : 'hidden'}`}>Fórum</span>
              </Link>
            </li>
            <li>
              {/* Configurações */}
              <Link
                href="/dashboard/user-config"
                className={`flex items-center gap-2 ${!isOpen ? 'justify-start' : 'justify-center'} ${pathname === '/dashboard/user-config' ? 'rounded-sm bg-[#3B38A0] p-2 text-gray-50' : 'bg-transparent'} `}
              >
                <Bolt size={20} />
                <span className={`${!isOpen ? 'block' : 'hidden'}`}>
                  Configurações
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Ocultar o sidebar */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="absolute top-40 left-full -translate-x-1/2 -translate-y-1/2 rounded-full p-2"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </Button>
      {/* Rodapé - Dúvidas Frequentes */}
      <div className="text-sm">
        <Link
          href="/dashboard/faq"
          className={`flex items-center gap-2 ${!isOpen ? 'justify-start' : 'justify-center'} ${pathname === '/dashboard/faq' ? 'rounded-sm bg-[#3B38A0] p-2 text-gray-50' : 'bg-transparent'} `}
        >
          <MessageCircleQuestion size={20} />
          <span className={`${!isOpen ? 'block' : 'hidden'}`}>
            Dúvidas Frequentes
          </span>
        </Link>
      </div>
    </aside>
  );
}
