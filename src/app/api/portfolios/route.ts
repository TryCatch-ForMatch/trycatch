import { NextRequest } from 'next/server';
import { z } from 'zod';
import { UserRole } from '@prisma/client';
import { logger } from '@/lib/logger';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { listPublicPortfolios } from '@/lib/portfolio.service';

const CONTEXT = 'GET /api/portfolios';

// Query params:
//   ?cursor=joao_public     → cursor de paginação (resetar ao mudar filtros)
//   ?take=20                → itens por página (default 20, máx 50)
//   ?name=joao              → busca parcial no nome
//   ?username=joao          → busca parcial no userName
//   ?role=MENTOR            → filtra por role (USER | MENTOR | ADMIN)
//   ?skills=id1,id2         → IDs de skills separados por vírgula (some/OR)
//   ?stacks=id1,id2         → IDs de stacks separados por vírgula (some/OR)
//   ?projectName=plataforma → busca parcial no nome de projeto concluído
const querySchema = z.object({
  cursor: z.string().optional(),
  take: z.coerce.number().int().positive().max(50).default(20),
  name: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
  role: z.nativeEnum(UserRole).optional(),
  skills: z.string().min(1).optional(), // busca parcial no nome da skill
  stacks: z.string().optional(), // "id1,id2,id3"
  projectName: z.string().min(1).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const raw = Object.fromEntries(request.nextUrl.searchParams.entries());
    const parsed = querySchema.safeParse(raw);

    if (!parsed.success) {
      return buildResponse({
        success: false,
        message: MESSAGES.GENERAL.INVALID_DATA,
        errors: parsed.error.format(),
        status: 400,
      });
    }

    const { cursor, take, name, username, role, skills, stacks, projectName } =
      parsed.data;

    const result = await listPublicPortfolios(
      {
        name,
        username,
        role,
        skillName: skills,
        stackIds: stacks ? stacks.split(',').filter(Boolean) : undefined,
        projectName,
      },
      cursor,
      take
    );

    logger.info('Portfolio list fetched', CONTEXT, {
      count: result.items.length,
      cursor: cursor ?? 'start',
      hasNextPage: result.hasNextPage,
      filters: { name, username, role, skills, stacks, projectName },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.GENERAL.SUCCESS,
      data: result,
      status: 200,
    });
  } catch (error) {
    logger.error('Unexpected error listing portfolios', CONTEXT, {
      error: error instanceof Error ? error.message : String(error),
    });

    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      status: 500,
    });
  }
}
