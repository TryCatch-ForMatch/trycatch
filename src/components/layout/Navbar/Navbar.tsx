'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
//import components
import Image from 'next/image';
import { Button } from '@/components/ui/button';

//import icons
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

export function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  //Open sidebar
  function handleToggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <aside
      className={`relative flex h-screen flex-col justify-between border-r border-gray-300 bg-transparent px-4 py-6 ${isSidebarOpen ? 'w-60' : 'w-20'} transition-width duration-300`}
    >
      <div>
        {/* Logo */}
        <Link href="/home">
          <div
            className={`mb-8 text-center text-2xl font-bold text-[#3B38A0] ${isSidebarOpen ? 'block' : 'hidden'}`}
          >
            TryCatch
          </div>
        </Link>

        {/* Avatar + Nome do usuário */}
        <Link href={'/dashboard/profile'}>
          {user && (
            <div className="mb-8 flex items-center gap-3">
              {user.avatar && (
                <Image
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.name || 'Avatar'}
                  width={45}
                  height={45}
                  className="rounded-full"
                />
              )}
              <div
                className={`flex flex-col ${isSidebarOpen ? 'block' : 'hidden'}`}
              >
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
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 ${isSidebarOpen ? 'justify-start' : 'justify-center'} ${pathname === '/dashboard' ? 'rounded-sm bg-[#3B38A0] p-2 text-gray-50' : 'bg-transparent'} `}
              >
                <Home size={20} />
                <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
                  Pagina Inicial
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/team-projects"
                className={`flex items-center gap-2 ${isSidebarOpen ? 'justify-start' : 'justify-center'} ${pathname === '/dashboard/team-projects' ? 'rounded-sm bg-[#3B38A0] p-2 text-gray-50' : 'bg-transparent'} `}
              >
                <FolderKanban size={20} />
                <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
                  Projetos
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/portfolios"
                className={`flex items-center gap-2 ${isSidebarOpen ? 'justify-start' : 'justify-center'} ${pathname === '/portfolios' ? 'rounded-sm bg-[#3B38A0] p-2 text-gray-50' : 'bg-transparent'} `}
              >
                <Users size={20} />
                <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
                  Portfolios
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/forum"
                className={`flex items-center gap-2 ${isSidebarOpen ? 'justify-start' : 'justify-center'} ${pathname === '/dashboard/forum' ? 'rounded-sm bg-[#3B38A0] p-2 text-gray-50' : 'bg-transparent'} `}
              >
                <MessageSquare size={20} />
                <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
                  Forum
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/user-config"
                className={`flex items-center gap-2 ${isSidebarOpen ? 'justify-start' : 'justify-center'} ${pathname === '/dashboard/user-config' ? 'rounded-sm bg-[#3B38A0] p-2 text-gray-50' : 'bg-transparent'} `}
              >
                <Bolt size={20} />
                <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
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
        onClick={handleToggleSidebar}
        className="absolute top-40 left-full -translate-x-1/2 -translate-y-1/2 rounded-full p-2"
      >
        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </Button>
      {/* Rodapé - Dúvidas Frequentes */}
      <div className="text-sm">
        <Link
          href="/faq"
          className={`flex items-center gap-2 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}
        >
          <MessageCircleQuestion size={20} />
          <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
            Duvidas Frequentes
          </span>
        </Link>
      </div>
    </aside>
  );
}
