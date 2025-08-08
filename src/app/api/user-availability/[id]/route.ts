import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { NextResponse, NextRequest } from 'next/server';

const idSchema = z.string().min(25, 'ID inválido').max(36, 'ID inválido');

const userAvailabilityUpdateSchema = z.object({
  isMentor: z.boolean().optional(),
  skills: z.array(z.string()).optional(),
  weekday: z.number().int().min(0).max(6).optional(),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato inválido (HH:MM)')
    .optional(),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato inválido (HH:MM)')
    .optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized) return response;

  const { id } = context.params;

  const idParse = idSchema.safeParse(id);

  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const availabilityId = idParse.data;

  try {
    const availability = await prisma.userAvailability.findUnique({
      where: { id: availabilityId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true,
            linkedin: true,
            github: true,
            bio: true,
          },
          include: {
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
    });

    if (!availability) {
      return NextResponse.json(
        { error: 'Disponibilidade não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(availability);
  } catch (error) {
    console.error('[USER_AVAILABILITY_GET_ID]', error);
    return NextResponse.json(
      { message: 'Erro ao buscar disponibilidade' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);

  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const availabilityId = idParse.data;

  try {
    const existing = await prisma.userAvailability.findUnique({
      where: { id: availabilityId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Disponibilidade não encontrada' },
        { status: 404 }
      );
    }

    if (existing.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para editar essa disponibilidade' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = userAvailabilityUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { skills, ...availabilityData } = parsed.data;

    const updated = await prisma.userAvailability.update({
      where: { id: availabilityId },
      data: {
        ...availabilityData,
        userId: session.user.id,
      },
    });

    if (skills) {
      // Remove vínculos antigos do usuário
      await prisma.userSkill.deleteMany({
        where: { userId: session.user.id },
      });

      // Cria vínculos novos
      if (skills.length > 0) {
        await prisma.userSkill.createMany({
          data: skills.map((skillId) => ({
            userId: session.user.id,
            skillId,
          })),
          skipDuplicates: true,
        });
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[USER_AVAILABILITY_PUT_ID]', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar disponibilidade' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ['ADMIN', 'USER'],
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);

  if (!idParse.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const availabilityId = idParse.data;

  try {
    const existing = await prisma.userAvailability.findUnique({
      where: { id: availabilityId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Disponibilidade não encontrada' },
        { status: 404 }
      );
    }

    if (existing.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para excluir essa disponibilidade' },
        { status: 403 }
      );
    }

    await prisma.userAvailability.delete({
      where: { id: availabilityId },
    });

    return NextResponse.json({
      message: 'Disponibilidade excluída com sucesso',
    });
  } catch (error) {
    console.error('[USER_AVAILABILITY_DELETE_ID]', error);
    return NextResponse.json(
      { message: 'Erro ao excluir disponibilidade' },
      { status: 500 }
    );
  }
}
