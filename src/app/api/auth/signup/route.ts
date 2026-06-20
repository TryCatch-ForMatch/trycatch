import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { NextRequest } from 'next/server';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { logger } from '@/lib/logger';
import { generateUniqueUsername } from '@/lib/generate-username';

const createUserSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().email('Email inválido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  avatar: z.string(),
  linkedin: z.union([z.string().url(), z.literal('')]).nullable(),
  github: z.union([z.string().url(), z.literal('')]).nullable(),
  bio: z.string().optional(),
  inviteCode: z.string(),
});

export async function POST(request: NextRequest) {
  let json;
  try {
    json = await request.json();
  } catch (error) {
    logger.error(
      'Erro ao ler o corpo da requisição:',
      'POST /api/auth/signup',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
    });
  }

  const parse = createUserSchema.safeParse(json);
  if (!parse.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: parse.error.format(),
      status: 400,
    });
  }

  const { name, email, password, avatar, linkedin, github, bio, inviteCode } =
    parse.data;

  try {
    const invite = await prisma.invite.findFirst({
      where: { email, code: inviteCode, used: false },
    });

    if (!invite) {
      return buildResponse({
        success: false,
        message: MESSAGES.REGISTER.INVALID,
        status: 403,
      });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return buildResponse({
        success: false,
        message: MESSAGES.USER.ALREADY_EXISTS,
        status: 400,
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await hash(password, 10);
    } catch (error) {
      logger.error('Erro ao hashear senha:', 'POST /api/auth/signup', {
        error: error instanceof Error ? error.message : String(error),
      });
      return buildResponse({
        success: false,
        message: MESSAGES.USER.INTERNAL_ERROR_HASH,
        status: 500,
      });
    }

    const userName = await generateUniqueUsername(name);

    const user = await prisma.user.create({
      data: {
        name,
        userName,
        email,
        password: hashedPassword,
        avatar,
        linkedin,
        github,
        bio,
        role: invite.role,
      },
    });

    await prisma.invite.update({
      where: { id: invite.id },
      data: { used: true },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.USER.CREATED,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      status: 201,
    });
  } catch (error) {
    logger.error('Erro interno ao criar usuário:', 'POST /api/auth/signup', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: MESSAGES.USER.USER_CREATION_ERROR,
      status: 500,
    });
  }
}
