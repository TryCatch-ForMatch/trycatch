import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { NextResponse } from 'next/server';
import { buildResponse, MESSAGES } from '@/constants/messages';

export async function GET() {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        linkedin: true,
        github: true,
        bio: true,
        // pega disponibilidades
        availability: {
          select: {
            id: true,
            isMentor: true,
            weekday: true,
            startTime: true,
            endTime: true,
          },
          orderBy: { weekday: 'asc' },
        },
        // pega skills
        skills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
                iconUrl: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER_AVAILABILITY.NOT_FOUND,
        status: 404,
      });
    }

    return NextResponse.json({
      ...user,
      skills: user.skills.map((s) => s.skill),
    });
  } catch (error) {
    console.error('[USER_AVAILABILITY_ME_GET]', error);
    return buildResponse({
      success: false,
      message: MESSAGES.USER_AVAILABILITY.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao buscar disponibilidade do usuário'],
    });
  }
}
