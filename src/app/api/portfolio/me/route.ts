import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { z } from 'zod';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { ROLE_GROUPS } from '@/lib/roles';
import { logger } from '@/lib/logger';

const CONTEXT_GET = 'GET /api/portfolio/me';
const CONTEXT_PATCH = 'PATCH /api/portfolio/me';

const updatePortfolioSchema = z.object({
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
  github: z.string().url('URL inválida').optional().or(z.literal('')),
  linkedin: z.string().url('URL inválida').optional().or(z.literal('')),
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

  try {
    const portfolio = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        userName: true,
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
        skills: {
          include: { skill: true },
        },
        certificates: true,
        feedbacksReceived: {
          include: {
            fromUser: {
              select: { name: true, avatar: true },
            },
          },
        },
        stacksTaken: {
          include: {
            stack: true,
            project: {
              select: { id: true, name: true, status: true },
            },
          },
        },
      },
    });

    if (!portfolio) {
      logger.warn(CONTEXT_GET, 'Authenticated user not found in DB', { userId });
      return buildResponse({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
        status: 404,
      });
    }

    logger.info(CONTEXT_GET, 'Portfolio settings fetched', { userId });
    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    logger.error(CONTEXT_GET, 'Unexpected error fetching portfolio settings', {
      userId,
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      status: 500,
    });
  }
}

export async function PATCH(request: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const userId = session.user.id;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
    });
  }

  const parsed = updatePortfolioSchema.safeParse(body);

  if (!parsed.success) {
    logger.warn(CONTEXT_PATCH, 'Validation failed', {
      userId,
      errors: parsed.error.format(),
    });
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
    github,
    linkedin,
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

  try {
    const updateData: Partial<Prisma.UserUpdateInput> = {};

    if (bio !== undefined) updateData.bio = bio;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (github !== undefined) updateData.github = github || null;
    if (linkedin !== undefined) updateData.linkedin = linkedin || null;
    if (showEmail !== undefined) updateData.showEmail = showEmail;
    if (showGithub !== undefined) updateData.showGithub = showGithub;
    if (showLinkedin !== undefined) updateData.showLinkedin = showLinkedin;
    if (showCertificates !== undefined) updateData.showCertificates = showCertificates;
    if (showProjects !== undefined) updateData.showProjects = showProjects;
    if (showFeedback !== undefined) updateData.showFeedback = showFeedback;
    if (portfolioPublic !== undefined) updateData.portfolioPublic = portfolioPublic;

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({ where: { id: userId }, data: updateData });
    }

    if (skills) {
      await prisma.userSkill.deleteMany({ where: { userId } });
      await prisma.userSkill.createMany({
        data: skills.map((s) => ({ userId, skillId: s.skillId })),
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

    logger.info(CONTEXT_PATCH, 'Portfolio settings updated', {
      userId,
      fields: Object.keys(updateData),
      updatedSkills: !!skills,
      updatedCertificates: !!certificates,
    });

    return buildResponse({
      success: true,
      message: MESSAGES.USER.UPDATED,
      status: 200,
    });
  } catch (error) {
    logger.error(CONTEXT_PATCH, 'Unexpected error updating portfolio settings', {
      userId,
      error: error instanceof Error ?