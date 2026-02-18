import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { NextResponse, NextRequest } from 'next/server';
import { hash } from 'bcryptjs';
import { buildResponse, MESSAGES } from '@/constants/messages';
import { ROLES, Role } from '@/lib/roles';

const adminCreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.union([z.string().url(), z.literal('')]).nullable(),
  linkedin: z.union([z.string().url(), z.literal(''), z.null()]).optional(),
  github: z.union([z.string().url(), z.literal(''), z.null()]).optional(),
  bio: z.string().optional(),
  role: z.enum(Object.values(ROLES) as [Role, ...Role[]]),
  skills: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  const json = await request.json();
  const parse = adminCreateUserSchema.safeParse(json);

  if (!parse.success) {
    console.log('Erro no parse:', parse.error.format());
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      status: 400,
      errors: ['Dados inválidos.', parse.error.format()],
    });
  }

  const { name, email, password, avatar, linkedin, github, bio, role, skills } =
    parse.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return buildResponse({
      success: false,
      message: MESSAGES.USER.ALREADY_EXISTS,
      status: 400,
      errors: ['Email já cadastrado.'],
    });
  }

  let hashedPassword;

  try {
    hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar,
        linkedin,
        github,
        bio,
        role,
        skills: skills
          ? {
              create: skills.map((skillId) => ({
                skill: { connect: { id: skillId } },
              })),
            }
          : undefined,
      },
      include: {
        skills: {
          include: { skill: true },
        },
      },
    });

    const userCreated = {
      id: user.id,
      nome: user.name,
      role: user.role,
    };

    return NextResponse.json(userCreated, {
      status: 200,
    });
  } catch (error) {
    console.error('Erro interno ao criar usuário:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro interno ao criar usuário.'],
    });
  }
}

export async function GET() {
  const { authorized, response } = await checkAuth({ requireAdmin: true });
  if (!authorized) return response;

  try {
    const users = await prisma.user.findMany({
      include: {
        skills: {
          include: { skill: true },
        },
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return buildResponse({
      success: false,
      message: MESSAGES.USER.INTERNAL_ERROR,
      status: 500,
      errors: ['Erro ao buscar usuários.'],
    });
  }
}
