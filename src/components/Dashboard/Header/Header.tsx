'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useProjectsCount } from '@/hooks/api/useProjects';
import { Clock, Check, Ellipsis, LogOut } from 'lucide-react';
import { useSidebar } from '@/Context/SidebarContextOpenClose';

function ProjectStat({
  icon: Icon,
  text,
  value,
  isLoading,
}: {
  icon: React.ElementType;
  text: string;
  value?: number;
  isLoading: boolean;
}) {
  return (
    <Badge
      variant="outline"
      className="h-9 min-w-[160px] gap-2 bg-background px-4 text-sm font-normal shadow-xs [&>svg]:size-4"
    >
      <Icon aria-hidden className="text-primary" />
      {isLoading ? (
        <Skeleton className="h-4 w-20" />
      ) : (
        <span>
          {value} {text}
        </span>
      )}
    </Badge>
  );
}

export function DashboardHeader() {
  const { counts, isLoading: isProjectsLoading } = useProjectsCount();
  const { isOpen } = useSidebar();

  return (
    <header
      className={`fixed top-0 right-0 z-50 flex items-center justify-between p-4 py-5 shadow-sm ${isOpen ? 'left-20 w-[calc(100%-80px)]' : 'left-60 w-[calc(100%-240px)]'} bg-background`}
    >
      <div className="flex items-center gap-10">
        <ProjectStat
          icon={Check}
          text="Finalizados"
          value={counts?.concluido}
          isLoading={isProjectsLoading}
        />
        <ProjectStat
          icon={Clock}
          text="Em produção"
          value={counts?.emAndamento}
          isLoading={isProjectsLoading}
        />
        <ProjectStat
          icon={Ellipsis}
          text="Aberto"
          value={counts?.buscando}
          isLoading={isProjectsLoading}
        />
      </div>

      <div>
        <Button
          onClick={() => signOut({ callbackUrl: '/' })}
          variant="outline"
          className="flex items-center justify-center gap-2 font-normal"
        >
          <LogOut aria-hidden className="text-primary" />
          <span>Desconectar</span>
        </Button>
      </div>
    </header>
  );
}
