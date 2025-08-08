import { z } from 'zod';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';

const userAvailabilitySchema = z.object({
  isMentor: z.boolean().optional().default(false),
  weekday: z.number().int().min(0).max(6),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato inválido (HH:MM)'),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato inválido (HH:MM)'),
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
      return NextResponse.json(
        { error: 'Dados inválidos', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const created = await prisma.userAvailability.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('[USER_AVAILABILITY_POST]', error);
    return NextResponse.json(
      { message: 'Erro ao criar disponibilidade' },
      { status: 500 }
    );
  }
}
