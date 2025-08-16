import { z } from 'zod';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { buildResponse, MESSAGES } from '@/constants/messages';

const userAvailabilitySchema = z.object({
  isMentor: z.boolean().optional().default(false),
  availabilities: z.array(
    z.object({
      weekday: z.number().int().min(0).max(6),
      startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    })
  ),
  skills: z.array(z.string()).optional(),
});

export type UserAvailabilityInput = z.infer<typeof userAvailabilitySchema>;

export async function GET() {
  const { authorized, response } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized) return response;

  try {
    const availabilities = await prisma.userAvailability.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true,
            linkedin: true,
            github: true,
            bio: true,
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
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(availabilities, { status: 200 });
  } catch (error) {
    console.error('[USER_AVAILABILITY_GET]', error);
    return NextResponse.json(
      { message: 'Erro ao buscar disponibilidade dos usuários' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  try {
    const body = await req.json();
    const parsed = userAvailabilitySchema.safeParse(body);

    if (!parsed.success) {
      return buildResponse({
        success: false,
        message: MESSAGES.GENERAL.INVALID_DATA,
        status: 400,
      });
    }

    const { skills, availabilities, isMentor } = parsed.data;

    await prisma.userAvailability.createMany({
      data: availabilities.map(({ weekday, startTime, endTime }) => ({
        userId: session.user.id,
        isMentor,
        weekday,
        startTime,
        endTime,
      })),
    });

    if (skills?.length) {
      await prisma.userSkill.createMany({
        data: skills.map((skillId) => ({
          userId: session.user.id,
          skillId,
        })),
        skipDuplicates: true,
      });
    }

    return buildResponse({
      success: false,
      message: MESSAGES.USER_AVAILABILITY.CREATED,
      status: 201,
    });
  } catch (error) {
    console.error('[USER_AVAILABILITY_POST]', error);
    return buildResponse({
      success: false,
      message: MESSAGES.USER_AVAILABILITY.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao criar disponibilidade'],
    });
  }
}
