import { NextRequest } from 'next/server';
import { z } from 'zod';
import { UserRole } from '@prisma/client';
import { logger } from '@/lib/logger';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { listPortfolioSummary } from '@/lib/portfolio.service';

const CONTEXT = 'GET /api/portfolio/summary';

// Query params:
//   ?cursor=joao_public  → cursor de paginação (resetar ao mudar filtros)
//   ?take=20             → itens por página (default 20, máx 50)
//   ?role=MENTOR         → filtra por role (USER | MENTOR | ADMIN)
//   ?skills=id1,id2      → IDs de skills separados por vírgula (some/OR)
const querySchema = z.object({
  cursor: z.string().optional(),
  take: z.coerce.number().int().positive().max(50).default(20),
  role: z.enum(UserRole).optional(),
  skills: z.string().optional(), // "id1,id2,id3"
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

    const { cursor, take, role, skills } = parsed.data;

    const result = await listPortfolioSummary(
      {
        role,
        skillIds: skills ? skills.split(',').filter(Boolean) : undefined,
      },
      cursor,
      take
    );

    logger.info('Portfolio summary fetched', CONTEXT, {
      count: result.items.length,
      cursor: cursor ?? 'start',
      hasNextPage: result.hasNextPage,
      filters: { role, skills },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.GENERAL.SUCCESS,
      data: result,
      status: 200,
    });
  } catch (error) {
    logger.error('Unexpected error fetching portfolio summary', CONTEXT, {
      error: error instanceof Error ? error.message : String(error),
    });

    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      status: 500,
    });
  }
}
