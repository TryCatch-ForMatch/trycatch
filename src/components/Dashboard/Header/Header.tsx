'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/api/useProjects';
import { Clock, Check, Ellipsis, LogOut } from 'lucide-react';
import { useSidebar } from '@/Context/SidebarContextOpenClose';

export function DashboardHeader() {
  const { projectsEstatistica, isProjectsLoading } = useProjects();
  const { isOpen }= useSidebar()

  // Componente reutilizável para os botões de estatística
  const StatButton = ({
    icon: Icon,
    text,
    value,
  }: {
    icon: React.ElementType;
    text: string;
    value?: number;
  }) => (
    <Button
      variant="outline"
      size="default"
      className="font-regular flex min-w-[160px] items-center justify-center gap-2 cursor-default"
    >
      <span className="text-[#3B38A1]">
        <Icon />
      </span>
      {isProjectsLoading ? (
        // Efeito shimmer (carregando)
        <span className="h-4 w-20 animate-pulse rounded bg-zinc-200" />
      ) : (
        <span>
          {value} {text}
        </span>
      )}
    </Button>
  );

  return (
    <header className={`flex items-center justify-between shadow-sm p-4 py-5 fixed top-0 z-50  right-0  ${isOpen ? "left-20 w-[calc(100%-80px)]" : "left-60 w-[calc(100%-240px)]"}  bg-background`}>

      {/* Botões de estatísticas */}
      <div className="flex items-center gap-10">
        <StatButton
          icon={Check}
          text="Finalizados"
          value={projectsEstatistica?.counts?.concluido}
        />
        <StatButton
          icon={Clock}
          text="Em produção"
          value={projectsEstatistica?.counts?.emAndamento}
        />
        <StatButton
          icon={Ellipsis}
          text="Aberto"
          value={projectsEstatistica?.counts?.buscando}
        />
      </div>

      {/* Botão de logout */}
      <div>
        <Button
          onClick={() => signOut({ callbackUrl: '/' })}
          variant="outline"
          size="default"
          className="font-regular flex items-center justify-center gap-2"
        >
          <span className="text-[#3B38A1]">
            <LogOut />
          </span>
          <span>Desconectar</span>
        </Button>
      </div>
    </header>
  );
}
