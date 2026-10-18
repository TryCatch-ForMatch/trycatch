'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/Context/SidebarContextOpenClose';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const mainItems: NavItem[] = [
  { href: '/dashboard', label: 'Página Inicial', icon: Home },
  { href: '/dashboard/team-projects', label: 'Projetos', icon: FolderKanban },
  { href: '/dashboard/portfolio', label: 'Portfólio', icon: Users },
  { href: '/dashboard/forum', label: 'Fórum', icon: MessageSquare },
  { href: '/dashboard/user-config', label: 'Configurações', icon: Bolt },
];

const faqItem: NavItem = {
  href: '/dashboard/faq',
  label: 'Dúvidas Frequentes',
  icon: MessageCircleQuestion,
};

function NavLink({
  item,
  isActive,
  isCollapsed,
}: {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center gap-2',
        isCollapsed ? 'justify-center' : 'justify-start',
        isActive
          ? 'rounded-sm bg-primary p-2 text-primary-foreground'
          : 'bg-transparent'
      )}
    >
      <Icon aria-hidden size={20} />
      <span className={isCollapsed ? 'sr-only' : undefined}>{item.label}</span>
    </Link>
  );
}

export function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  const { isOpen: isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        'sticky top-0 flex h-screen flex-col justify-between bg-background px-4 py-6 shadow-sm transition-[width] duration-300',
        isCollapsed ? 'w-20' : 'w-60'
      )}
    >
      <div>
        <Link
          href="/dashboard"
          aria-label="Ir para a página dashboard"
          className={isCollapsed ? 'hidden' : 'block'}
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

        <Link href="/dashboard/profile">
          {user && (
            <div className="mt-8 mb-8 flex items-center gap-3">
              {user.avatar && (
                <Image
                  src={user.avatar}
                  alt={user.name || 'Avatar'}
                  width={45}
                  height={45}
                  className="rounded-full"
                />
              )}
              <div
                className={cn('flex flex-col', isCollapsed ? 'sr-only' : '')}
              >
                <span className="text-sm font-medium text-foreground">
                  {user.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          )}
        </Link>

        <nav aria-label="Menu principal">
          <ul className="flex flex-col gap-6 text-base text-foreground">
            {mainItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  item={item}
                  isActive={pathname === item.href}
                  isCollapsed={isCollapsed}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
        aria-expanded={!isCollapsed}
        className="absolute top-40 left-full -translate-x-1/2 -translate-y-1/2 rounded-full p-2"
      >
        {isCollapsed ? (
          <ChevronLeft aria-hidden size={20} />
        ) : (
          <ChevronRight aria-hidden size={20} />
        )}
      </Button>

      <div className="text-sm">
        <NavLink
          item={faqItem}
          isActive={pathname === faqItem.href}
          isCollapsed={isCollapsed}
        />
      </div>
    </aside>
  );
}
