import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.union([z.string().url(), z.literal('')]).nullable(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  inviteCode: z.string(),
});

export async function POST(req: Request) {
  let json;
  try {
    json = await req.json();
  } catch (error) {
    console.error('Erro ao fazer parse do JSON:', error);
    return NextResponse.json(
      { error: 'Body inválido. Envie um JSON válido.' },
      { status: 400 }
    );
  }

  const parse = createUserSchema.safeParse(json);
  if (!parse.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', issues: parse.error.format() },
      { status: 400 }
    );
  }

  const {
    name,
    email,
    password,
    avatar,
    linkedin,
    github,
    bio,
    skills,
    inviteCode,
  } = parse.data;

  try {
    const invite = await prisma.invite.findFirst({
      where: { email, code: inviteCode, used: false },
    });

    if (!invite) {
      return NextResponse.json(
        { error: 'Convite inválido ou já utilizado.' },
        { status: 403 }
      );
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return NextResponse.json(
        { error: 'Email já cadastrado.' },
        { status: 400 }
      );
    }

    let hashedPassword;
    try {
      hashedPassword = await hash(password, 10);
    } catch (error) {
      console.error('Erro ao hashear senha:', error);
      return NextResponse.json(
        { error: 'Erro interno no processamento da senha.' },
        { status: 500 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar,
        linkedin,
        github,
        bio,
        skills: skills
          ? {
              create: skills.map((skillId: string) => ({
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

    await prisma.invite.update({
      where: { id: invite.id },
      data: { used: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Erro interno ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar usuário.' },
      { status: 500 }
    );
  }
}
