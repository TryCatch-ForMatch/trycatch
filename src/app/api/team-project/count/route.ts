import { MESSAGES, buildResponse } from '@/constants/messages';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Agrupa e conta projetos por status
    const grouped = await prisma.project.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    // Calcula os valores com fallback para 0
    const counts = {
      total: grouped.reduce((acc, cur) => acc + cur._count.status, 0),
      buscando:
        grouped.find((g) => g.status === 'BUSCANDO')?._count.status || 0,
      emAndamento:
        grouped.find((g) => g.status === 'EM_ANDAMENTO')?._count.status || 0,
      concluido:
        grouped.find((g) => g.status === 'CONCLUÍDO')?._count.status || 0,
    };

    return NextResponse.json({ counts });
  } catch (error) {
    console.error('Erro ao buscar número de projetos:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT.INTERNAL_ERROR,
      status: 500,
      errors: [error instanceof Error ? error.message : String(error)],
    });
  }
}
