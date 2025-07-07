import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { NextResponse, NextRequest } from 'next/server';
import { hash } from 'bcrypt';

const adminCreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.union([z.string().url(), z.literal('')]).nullable(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  bio: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']),
  skills: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  const json = await request.json();
  const parse = adminCreateUserSchema.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', issues: parse.error.format() },
      { status: 400 }
    );
  }

  const { name, email, password, avatar, linkedin, github, bio, role, skills } =
    parse.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: 'Email já cadastrado.' },
      { status: 400 }
    );
  }

  const hashedPassword = await hash(password, 10);

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
  });

  return NextResponse.json({
    message: 'Usuário criado com sucesso.',
    id: user.id,
    role: user.role,
  });
}
