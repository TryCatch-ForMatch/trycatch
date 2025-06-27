import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params }: Params) {
  let session;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error('Erro ao obter sessão:', error);
    return NextResponse.json(
      { error: 'Erro de autenticação' },
      { status: 500 }
    );
  }

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const feedbackId = params.id;

  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        fromUser: true,
        toUser: true,
        stackTaken: {
          include: {
            stack: true,
            project: true,
          },
        },
      },
    });

    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Erro ao buscar feedback:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
