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

    // Cria o objeto inicial
    const counts = {
      total: 0,
      buscando: 0,
      emAndamento: 0,
      concluido: 0,
    };

    // Soma total e atribui conforme o status do banco
    grouped.forEach((item) => {
      counts.total += item._count.status;
      if (item.status === 'BUSCANDO') counts.buscando = item._count.status;
      if (item.status === 'EM_ANDAMENTO')
        counts.emAndamento = item._count.status;
      if (item.status === 'CONCLUIDO') counts.concluido = item._count.status;
    });

    return NextResponse.json({ success: true, counts });
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
