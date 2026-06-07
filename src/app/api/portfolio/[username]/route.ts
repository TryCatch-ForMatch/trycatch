// src/app/api/portfolio/[username]/route.ts
//
// Rota pública — NÃO requer autenticação.
// Qualquer visitante pode acessar /api/portfolio/[username].

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import {
  getPublicPortfolio,
  PortfolioNotFoundError,
} from '@/lib/portfolio.service';

const CONTEXT = 'GET /api/portfolio/[username]';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;

  try {
    const portfolio = await getPublicPortfolio(username);

    logger.info(CONTEXT, 'Portfolio accessed', { username });

    return NextResponse.json(
      { success: true, message: 'Portfolio found', data: portfolio, errors: null },
      { status: 200 },
    );
  } catch (error) {
    // 404 esperado — portfólio inexistente, privado ou usuário inativo.
    // Retornamos 404 em todos os casos para não revelar se o usuário existe.
    if (error instanceof PortfolioNotFoundError) {
      logger.warn(CONTEXT, 'Portfolio not found or private', { username });

      return NextResponse.json(
        { success: false, message: 'Portfolio not found', data: null, errors: null },
        { status: 404 },
      );
    }

    // Erro inesperado — logar com detalhes, responder sem expor internos
    logger.error(CONTEXT, 'Unexpected error fetching portfolio', {
      username,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { success: false, message: 'Internal server error', data: null, errors: null },
      { status: 500 },
    );
  }
}
