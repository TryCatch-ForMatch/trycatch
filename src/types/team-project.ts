export interface ProjectSummaryType {
  id: string;
  name: string;
  description: string;
  deadline: string;
  skills: { id: string; name: string; iconUrl: string | null }[];
  stacksFilled: number;
  stacksTotal: number;
}

export type ProjectStatus = 'BUSCANDO' | 'EM_ANDAMENTO' | 'CONCLUÍDO';

export interface ProjectDetailsType {
  id: string;
  name: string;
  description: string;
  deadline: string;
  totalValue: number;
  owner: {
    id: string;
    name: string;
    avatar: string | null;
  };
  skills: {
    id: string;
    name: string;
    iconUrl: string | null;
  }[];
  stacks: {
    id: string;
    stackId: string;
    name: string;
    percentage: number;
    takenBy: {
      id: string;
      name: string;
      avatar: string | null;
      stackTakenId: string;
    } | null;
  }[];
}
