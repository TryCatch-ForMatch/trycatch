import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { ROLE_GROUPS } from '@/lib/roles';

const updatePortfolioSchema = z.object({
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
  skills: z
    .array(
      z.object({
        skillId: z.string().min(1, 'ID inválido.'),
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
  showEmail: z.boolean().optional(),
  showGithub: z.boolean().optional(),
  showLinkedin: z.boolean().optional(),
  showCertificates: z.boolean().optional(),
  showProjects: z.boolean().optional(),
  showFeedback: z.boolean().optional(),
  portfolioPublic: z.boolean().optional(),
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
      name: true,
      email: true,
      github: true,
      linkedin: true,
      bio: true,
      avatar: true,
      showEmail: true,
      showGithub: true,
      showLinkedin: true,
      showCertificates: true,
      showProjects: true,
      showFeedback: true,
      portfolioPublic: true,

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

  const {
    bio,
    avatar,
    skills,
    certificates,
    showEmail,
    showGithub,
    showLinkedin,
    showCertificates,
    showProjects,
    showFeedback,
    portfolioPublic,
  } = parsed.data;

  // `Prisma.UserUpdateInput` é o tipo que o Prisma aceita no campo `data` do update.
  // Usamos `Partial<>` porque no PATCH os campos são opcionais.
  // Isso permite montar dinamicamente um objeto apenas com os campos enviados,
  // mantendo segurança de tipos (evita usar `any`) e impedindo atualizar campos inválidos.

  const updateData: Partial<Prisma.UserUpdateInput> = {};

  if (bio !== undefined) updateData.bio = bio;
  if (avatar !== undefined) updateData.avatar = avatar;
  if (showEmail !== undefined) updateData.showEmail = showEmail;
  if (showGithub !== undefined) updateData.showGithub = showGithub;
  if (showLinkedin !== undefined) updateData.showLinkedin = showLinkedin;
  if (showCertificates !== undefined)
    updateData.showCertificates = showCertificates;
  if (showProjects !== undefined) updateData.showProjects = showProjects;
  if (showFeedback !== undefined) updateData.showFeedback = showFeedback;
  if (portfolioPublic !== undefined)
    updateData.portfolioPublic = portfolioPublic;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  const refreshedPortfolio = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      github: true,
      linkedin: true,
      bio: true,
      avatar: true,
      showEmail: true,
      showGithub: true,
      showLinkedin: true,
      showCertificates: true,
      showProjects: true,
      showFeedback: true,
      portfolioPublic: true,

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

  if (skills) {
    await prisma.userSkill.deleteMany({ where: { userId } });

    await prisma.userSkill.createMany({
      data: skills.map((s) => ({
        userId,
        skillId: s.skillId,
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
    data: refreshedPortfolio,
    status: 200,
  });
}
