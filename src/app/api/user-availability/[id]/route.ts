import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { NextResponse, NextRequest } from 'next/server';
import { buildResponse, MESSAGES } from '@/constants/messages';
import { ROLE_GROUPS } from '@/lib/roles';
import { logger } from '@/lib/logger';

const idSchema = z.string().min(25, 'ID inválido').max(36, 'ID inválido');

const userAvailabilityUpdateSchema = z.object({
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
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized) return response;

  const { id } = context.params;

  const idParse = idSchema.safeParse(id);

  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
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
      return buildResponse({
        success: false,
        message: MESSAGES.USER_AVAILABILITY.NOT_FOUND,
        status: 404,
      });
    }

    return NextResponse.json(availability, { status: 200 });
  } catch (error) {
    logger.error(
      'Unexpected error fetching availability',
      'GET /api/user-availability/[id]',
      {
        availabilityId: id,
        error: error instanceof Error ? error.message : String(error),
      }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.USER_AVAILABILITY.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao buscar disponibilidade'],
    });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);

  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }

  const availabilityId = idParse.data;

  try {
    const existing = await prisma.userAvailability.findUnique({
      where: { id: availabilityId },
    });

    if (!existing) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER_AVAILABILITY.NOT_FOUND,
        status: 404,
      });
    }

    if (existing.userId !== session.user.id) {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.UNAUTHORIZED,
        status: 403,
        errors: ['Você não tem permissão para editar essa disponibilidade'],
      });
    }

    const body = await request.json();
    const parsed = userAvailabilityUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return buildResponse({
        success: false,
        message: MESSAGES.GENERAL.INVALID_DATA,
        status: 400,
        errors: ['Dados inválidos', parsed.error.format()],
      });
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

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    logger.error(
      'Unexpected error updating availability',
      'PUT /api/user-availability/[id]',
      {
        availabilityId,
        userId: session.user.id,
        error: error instanceof Error ? error.message : String(error),
      }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.USER_AVAILABILITY.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao atualizar disponibilidade e skills'],
    });
  }
}

export async function DELETE(
  // request: NextRequest,
  context: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const idParse = idSchema.safeParse(context.params.id);

  if (!idParse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_ID,
      status: 400,
    });
  }

  const availabilityId = idParse.data;

  try {
    const existing = await prisma.userAvailability.findUnique({
      where: { id: availabilityId },
    });

    if (!existing) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER_AVAILABILITY.NOT_FOUND,
        status: 404,
      });
    }

    if (existing.userId !== session.user.id) {
      return buildResponse({
        success: false,
        message: MESSAGES.AUTH.UNAUTHORIZED,
        status: 403,
        errors: ['Você não tem permissão para excluir essa disponibilidade'],
      });
    }

    await prisma.userAvailability.delete({
      where: { id: availabilityId },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.USER_AVAILABILITY.DELETED,
      status: 200,
    });
  } catch (error) {
    logger.error(
      'Unexpected error deleting availability',
      'DELETE /api/user-availability/[id]',
      {
        availabilityId,
        userId: session.user.id,
        error: error instanceof Error ? error.message : String(error),
      }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.USER_AVAILABILITY.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao excluir disponibilidade'],
    });
  }
}
