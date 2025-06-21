import { User } from 'next-auth';

type DashboardHeaderProps = {
  user: User;
};

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header>
      <h1>Dashboard - Bem-vindo, {user.name ?? 'Usuário'}</h1>
    </header>
  );
}
