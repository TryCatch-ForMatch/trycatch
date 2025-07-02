import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao buscar skills.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'O nome da skill é obrigatório.' },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: { name },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Erro ao criar skill.' },
      { status: 500 }
    );
  }
}
