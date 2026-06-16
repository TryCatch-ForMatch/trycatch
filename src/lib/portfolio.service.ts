// Toda a lógica de negócio da feature de portfólio fica aqui.
// O route handler só chama o service e retorna a resposta — sem lógica misturada.

import { prisma } from '@/lib/prisma';
import { ProjectStatus, Prisma } from '@prisma/client';
import type {
  PortfolioPublicResponse,
  PortfolioProject,
  PortfolioSummaryItem,
  PortfolioListFilters,
  PortfolioSummaryFilters,
  PaginatedResponse,
} from '@/types/portfolio.types';

const DEFAULT_TAKE = 20;
const MAX_TAKE = 50;

// ---------------------------------------------------------------------------
// Helpers internos
// ---------------------------------------------------------------------------

function normalizeTake(takeParam: number): number {
  return Math.min(
    Number.isFinite(takeParam) && takeParam > 0 ? takeParam : DEFAULT_TAKE,
    MAX_TAKE
  );
}

/** Monta o bloco `where` base — sempre aplicado nos dois endpoints */
function baseWhere(): Prisma.UserWhereInput {
  return { isActive: true, portfolioPublic: true };
}

// ---------------------------------------------------------------------------
// Busca o portfólio público por username
// Lança erros específicos para que o handler possa retornar os status corretos
// ---------------------------------------------------------------------------
export async function getPublicPortfolio(
  username: string
): Promise<PortfolioPublicResponse> {
  const user = await prisma.user.findUnique({
    where: { userName: username },
    select: {
      userName: true,
      name: true,
      bio: true,
      avatar: true,
      isActive: true,
      portfolioPublic: true,
      showEmail: true,
      showGithub: true,
      showLinkedin: true,
      showCertificates: true,
      showProjects: true,
      showFeedback: true,
      email: true,
      github: true,
      linkedin: true,
      skills: {
        select: {
          skill: { select: { id: true, name: true, iconUrl: true } },
        },
      },
      stacksTaken: {
        where: { project: { status: ProjectStatus.CONCLUIDO } },
        select: {
          stackId: true,
          stack: { select: { name: true } },
          project: {
            select: { id: true, name: true, description: true, deadline: true },
          },
        },
      },
      certificates: {
        select: {
          id: true,
          title: true,
          issuer: true,
          date: true,
          url: true,
          description: true,
        },
      },
      feedbacksReceived: {
        select: {
          id: true,
          rating: true,
          comment: true,
          anonymous: true,
          fromUser: { select: { name: true } },
          project: { select: { name: true } },
        },
      },
    },
  });

  if (!user || !user.isActive || !user.portfolioPublic) {
    throw new PortfolioNotFoundError();
  }

  // Agrupamento de stacks por projeto (regra §6, item 15)
  const projectMap = new Map<string, PortfolioProject>();
  for (const st of user.stacksTaken) {
    const existing = projectMap.get(st.project.id);
    if (existing) {
      existing.stacks.push({ stackId: st.stackId, stackName: st.stack.name });
    } else {
      projectMap.set(st.project.id, {
        projectId: st.project.id,
        projectName: st.project.name,
        description: st.project.description,
        deadline: st.project.deadline.toISOString(),
        stacks: [{ stackId: st.stackId, stackName: st.stack.name }],
      });
    }
  }

  const response: PortfolioPublicResponse = {
    username: user.userName!,
    name: user.name,
    bio: user.bio,
    avatar: user.avatar,
    skills: user.skills.map((us) => us.skill),
  };

  if (user.showEmail && user.email) response.email = user.email;
  if (user.showGithub && user.github) response.github = user.github;
  if (user.showLinkedin && user.linkedin) response.linkedin = user.linkedin;
  if (user.showProjects) response.projects = Array.from(projectMap.values());
  if (user.showCertificates) response.certificates = user.certificates;
  if (user.showFeedback) {
    response.feedback = user.feedbacksReceived.map((fb) => ({
      id: fb.id,
      rating: fb.rating,
      comment: fb.comment,
      projectName: fb.project.name,
      givenBy: fb.anonymous ? null : fb.fromUser.name,
    }));
  }

  return response;
}

// ---------------------------------------------------------------------------
// Listagem /portfolios — cursor pagination + filtros
//
// Filtros disponíveis:
//   name        → busca parcial case-insensitive no nome do usuário
//   username    → busca parcial case-insensitive no userName
//   role        → filtra por UserRole (USER | MENTOR | ADMIN)
//   skillIds    → usuários com pelo menos uma das skills (some/OR)
//   stackIds    → usuários com pelo menos uma das stacks em projetos concluídos (some/OR)
//   projectName → busca parcial no nome de projetos concluídos do usuário
//
// ⚠️ Importante: o cursor deve ser resetado para undefined sempre que
// qualquer filtro mudar no frontend — caso contrário o Prisma pode pular
// registros silenciosamente.
// ---------------------------------------------------------------------------
export async function listPublicPortfolios(
  filters: PortfolioListFilters = {},
  cursor?: string,
  takeParam: number = DEFAULT_TAKE
): Promise<PaginatedResponse<PortfolioSummaryItem>> {
  const take = normalizeTake(takeParam);

  const where: Prisma.UserWhereInput = {
    ...baseWhere(),

    // Busca parcial no name — case-insensitive
    ...(filters.name && {
      name: { contains: filters.name, mode: 'insensitive' },
    }),

    // Busca parcial no userName — case-insensitive
    ...(filters.username && {
      userName: { contains: filters.username, mode: 'insensitive' },
    }),

    // Enum exato — validado pelo handler via Zod antes de chegar aqui
    ...(filters.role && { role: filters.role }),

    // Busca parcial no nome da skill — case-insensitive
    ...(filters.skillName && {
      skills: {
        some: {
          skill: { name: { contains: filters.skillName, mode: 'insensitive' } },
        },
      },
    }),

    // Pelo menos uma stack (OR) em projetos CONCLUÍDOS — via StackTaken
    ...(filters.stackIds?.length && {
      stacksTaken: {
        some: {
          stackId: { in: filters.stackIds },
          project: { status: ProjectStatus.CONCLUIDO },
        },
      },
    }),

    // Busca parcial no nome de projetos concluídos — case-insensitive
    ...(filters.projectName && {
      stacksTaken: {
        some: {
          project: {
            name: { contains: filters.projectName, mode: 'insensitive' },
            status: ProjectStatus.CONCLUIDO,
          },
        },
      },
    }),
  };

  const users = await prisma.user.findMany({
    take: take + 1,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { userName: cursor } : undefined,
    where,
    orderBy: { userName: 'asc' },
    select: {
      userName: true,
      name: true,
      bio: true,
      avatar: true,
      role: true,
      skills: {
        select: {
          skill: { select: { id: true, name: true, iconUrl: true } },
        },
      },
    },
  });

  const hasNextPage = users.length > take;
  const page = hasNextPage ? users.slice(0, take) : users;
  const nextCursor = hasNextPage
    ? (page[page.length - 1].userName ?? null)
    : null;

  return {
    items: page.map((u) => ({
      username: u.userName!,
      name: u.name,
      bio: u.bio,
      avatar: u.avatar,
      role: u.role,
      skills: u.skills.map((us) => us.skill),
    })),
    nextCursor,
    hasNextPage,
  };
}

// ---------------------------------------------------------------------------
// Summary /portfolio/summary — cursor pagination + filtros
//
// Filtros disponíveis:
//   role      → filtra por UserRole (vitrine de mentores, por ex.)
//   skillIds  → usuários com pelo menos uma das skills (some/OR)
// ---------------------------------------------------------------------------
export async function listPortfolioSummary(
  filters: PortfolioSummaryFilters = {},
  cursor?: string,
  takeParam: number = DEFAULT_TAKE
): Promise<PaginatedResponse<PortfolioSummaryItem>> {
  const take = normalizeTake(takeParam);

  const where: Prisma.UserWhereInput = {
    ...baseWhere(),

    ...(filters.role && { role: filters.role }),

    ...(filters.skillIds?.length && {
      skills: {
        some: { skillId: { in: filters.skillIds } },
      },
    }),
  };

  const users = await prisma.user.findMany({
    take: take + 1,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { userName: cursor } : undefined,
    where,
    orderBy: { userName: 'asc' },
    select: {
      userName: true,
      name: true,
      bio: true,
      avatar: true,
      role: true,
      github: true,
      linkedin: true,
      showGithub: true,
      showLinkedin: true,
      showFeedback: true,
      skills: {
        select: {
          skill: { select: { id: true, name: true, iconUrl: true } },
        },
      },
      feedbacksReceived: {
        select: { rating: true },
      },
    },
  });

  const hasNextPage = users.length > take;
  const page = hasNextPage ? users.slice(0, take) : users;
  const nextCursor = hasNextPage
    ? (page[page.length - 1].userName ?? null)
    : null;

  return {
    items: page.map((u) => {
      const avgFeedback =
        u.feedbacksReceived.length > 0
          ? u.feedbacksReceived.reduce((sum, fb) => sum + fb.rating, 0) /
            u.feedbacksReceived.length
          : null;

      return {
        username: u.userName!,
        name: u.name,
        bio: u.bio,
        avatar: u.avatar,
        role: u.role,
        github: u.showGithub ? u.github : null,
        linkedin: u.showLinkedin ? u.linkedin : null,
        feedback: u.showFeedback ? avgFeedback : null,
        skills: u.skills.map((us) => us.skill),
      };
    }),
    nextCursor,
    hasNextPage,
  };
}

// ---------------------------------------------------------------------------
// Erro semântico — permite que o handler diferencie 404 de 500
// ---------------------------------------------------------------------------
export class PortfolioNotFoundError extends Error {
  constructor() {
    super('Portfolio not found');
    this.name = 'PortfolioNotFoundError';
  }
}
