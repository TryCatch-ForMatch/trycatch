// src/types/portfolio.types.ts

import { UserRole } from '@prisma/client';

// ---------------------------------------------------------------------------
// Filtros
// ---------------------------------------------------------------------------

export interface PortfolioListFilters {
  name?: string; // busca parcial no name
  username?: string; // busca parcial no userName
  role?: UserRole; // USER | MENTOR | ADMIN
  skillName?: string; // busca parcial no nome da skill (some/OR)
  stackIds?: string[]; // pelo menos uma em projetos concluídos (some/OR)
  projectName?: string; // busca parcial no nome de projeto concluído
}

export interface PortfolioSummaryFilters {
  role?: UserRole; // USER | MENTOR | ADMIN
  skillIds?: string[]; // pelo menos uma (some/OR)
}

// ---------------------------------------------------------------------------
// Paginação
// ---------------------------------------------------------------------------

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor: string | null; // null = última página — frontend para de buscar
  hasNextPage: boolean;
}

// ---------------------------------------------------------------------------
// Shapes de resposta
// ---------------------------------------------------------------------------

export interface PortfolioStackItem {
  stackId: string;
  stackName: string;
}

export interface PortfolioProject {
  projectId: string;
  projectName: string;
  description: string;
  deadline: string;
  stacks: PortfolioStackItem[];
}

export interface PortfolioCertificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string | null;
  description: string | null;
}

export interface PortfolioFeedback {
  id: string;
  rating: number;
  comment: string | null;
  projectName: string;
  givenBy: string | null; // null quando anonymous = true
}

export interface PortfolioSummaryItem {
  username: string;
  name: string;
  bio: string | null;
  avatar: string | null;
  role: UserRole;
  // Campos do summary (opcionais — só presentes no /summary)
  github?: string | null;
  linkedin?: string | null;
  feedback?: number | null;
  skills: Array<{ id: string; name: string; iconUrl: string | null }>;
}

export interface PortfolioPublicResponse {
  username: string;
  name: string;
  bio: string | null;
  avatar: string | null;
  skills: Array<{ id: string; name: string; iconUrl: string | null }>;
  // Campos condicionais — ausentes (não null) quando toggle = false
  email?: string;
  github?: string;
  linkedin?: string;
  projects?: PortfolioProject[];
  certificates?: PortfolioCertificate[];
  feedback?: PortfolioFeedback[];
}

export interface UserPortfolioCardData {
  id: string;
  avatarUrl: string | null;
  displayName: string;
  role: UserRole;
  bio: string | null;
  skills: Array<{
    id: string;
    name: string;
    iconUrl: string | null;
  }>;
  githubUrl: string | null;
  linkedinUrl: string | null;
}
