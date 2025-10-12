'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/useProjects';
import { Clock, Check, Ellipsis, LogOut } from 'lucide-react';

export function DashboardHeader() {
  const { projectsEstatistica, isProjectsLoading } = useProjects();

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
      className="font-regular flex min-w-[160px] items-center justify-center gap-2"
    >
      <span className="text-[#3B38A1]">
        <Icon />
      </span>
      {isProjectsLoading ? (
        // Efeito shimmer (carregando)
        <span className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      ) : (
        <span>
          {value} {text}
        </span>
      )}
    </Button>
  );

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-300 p-4 py-5">
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
