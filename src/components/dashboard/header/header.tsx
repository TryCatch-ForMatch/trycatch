import { User } from 'next-auth';
import { LogoutButton } from '@/components/dashboard/LogoutButton/LogoutButton';

type DashboardHeaderProps = {
  user: User;
};

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4">
      <div>
        <h1>Dashboard - Bem-vindo, {user.name ?? 'Usuário'}</h1>
      </div>
      <LogoutButton />
    </header>
  );
}
