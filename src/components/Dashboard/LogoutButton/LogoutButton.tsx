'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button'; // nosso botão padrão shadcn
import { LogOut } from 'lucide-react'; // ícone padrão de logout

export function LogoutButton() {
  return (
    <Button
      variant="destructive" // fica com cor de ação crítica, tipo vermelho suave
      className="flex items-center gap-2"
      onClick={() => signOut({ callbackUrl: '/' })} // volta pra home após logout
    >
      <LogOut className="h-4 w-4" />
      Sair
    </Button>
  );
}
