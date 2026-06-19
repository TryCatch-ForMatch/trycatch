import TeamProjectPage from '.';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team Projects - TryCatch',
  description: 'Gerencie seus projetos em equipe com eficiência',
};

export default function Page() {
  return <TeamProjectPage />;
}
