'use client';
import { signOut } from 'next-auth/react';

//import components
import { Button } from '@/components/ui/button';

//import Icons
import { AlarmClock, Check, Ellipsis, LogOut } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-300 p-4 py-5">
      {/* Buttons actios */}
      <div className="flex items-center gap-10">
        <Button
          variant="outline"
          size="default"
          className="font-regular flex items-center justify-center gap-2"
        >
          <span>
            <Check />
          </span>
          <span>1 Finalizados</span>
        </Button>

        <Button
          variant="outline"
          size="default"
          className="font-regular flex items-center justify-center gap-2"
        >
          <span className="font-regular">
            <AlarmClock />
          </span>
          <span className="font-regular">2 Em produção</span>
        </Button>

        <Button
          variant="outline"
          size="default"
          className="font-regular flex items-center justify-center gap-2"
        >
          <span>
            <Ellipsis />
          </span>
          <span>1 Aberto</span>
        </Button>
      </div>

      <div>
        <Button
          onClick={() => signOut({ callbackUrl: '/' })}
          variant="outline"
          size="default"
          className="font-regular flex items-center justify-center gap-2"
        >
          <span>
            <LogOut />
          </span>
          <span>Desconectar</span>
        </Button>
      </div>
    </header>
  );
}
