import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';
import { z } from 'zod';

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
  const json = await req.json();
  const parse = createUserSchema.safeParse(json);

  if (!parse.success) {
    return Response.json(
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

  const invite = await prisma.invite.findFirst({
    where: { email, code: inviteCode, used: false },
  });

  if (!invite) {
    return Response.json(
      { error: 'Convite inválido ou já utilizado.' },
      { status: 403 }
    );
  }

  console.log('Request body:', json);
  console.log('Parse result:', parse);

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return Response.json({ error: 'Email já cadastrado.' }, { status: 400 });
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

  return Response.json(user);
}
