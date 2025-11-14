import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { ROLE_GROUPS } from '@/lib/roles';

const updatePortfolioSchema = z.object({
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
  emailVisible: z.boolean().optional(),
  skills: z
    .array(
      z.object({
        skillId: z.string().min(1, 'ID inválido.'),
        level: z.string().optional(),
      })
    )
    .optional(),
  certificates: z
    .array(
      z.object({
        id: z.string().optional(),
        title: z.string().min(1, 'O título é obrigatório'),
        issuer: z.string().min(1, 'O emissor é obrigatório'),
        url: z.string().url('URL inválida'),
        date: z.string().min(4, 'Data inválida (mes/ano)'),
        description: z.string().optional(),
      })
    )
    .optional(),
});

export async function GET() {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });

  if (!authorized || !session) return response;

  const userId = session.user.id;

  const portfolio = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true, // não edita
      email: true, // não edita
      emailVisible: true, // edita
      github: true, // não edita
      linkedin: true, // não edita
      bio: true, // edita
      avatar: true, // edita

      // Skills vinculadas ao usuário
      skills: {
        include: { skill: true },
      },

      // Certificados
      certificates: true,

      // Feedbacks recebidos
      feedbacksReceived: {
        include: {
          fromUser: {
            select: { name: true, avatar: true },
          },
        },
      },

      // Projetos (via stacksTaken)
      stacksTaken: {
        include: {
          stack: true,
          project: {
            select: {
              id: true,
              name: true,
              status: true,
            },
          },
        },
      },
    },
  });

  if (!portfolio) {
    return buildResponse({
      success: false,
      message: MESSAGES.USER.NOT_FOUND,
      status: 404,
    });
  }

  return NextResponse.json(portfolio, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const userId = session.user.id;
  const body = await request.json();
  const parsed = updatePortfolioSchema.safeParse(body);

  if (!parsed.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: parsed.error.format(),
      status: 400,
    });
  }

  const { bio, avatar, emailVisible, skills, certificates } = parsed.data;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      bio,
      avatar,
      emailVisible,
    },
  });

  if (skills) {
    await prisma.userSkill.deleteMany({ where: { userId } });

    await prisma.userSkill.createMany({
      data: skills.map((s) => ({
        userId,
        skillId: s.skillId,
        level: s.level ?? 'BEGINNER',
      })),
    });
  }

  if (certificates) {
    await prisma.userCertificate.deleteMany({ where: { userId } });

    await prisma.userCertificate.createMany({
      data: certificates.map((c) => ({
        userId,
        title: c.title,
        issuer: c.issuer,
        url: c.url,
        date: c.date,
        description: c.description ?? '',
      })),
    });
  }

  return buildResponse({
    success: true,
    message: MESSAGES.USER.UPDATED,
    data: updatedUser,
    status: 200,
  });
}
