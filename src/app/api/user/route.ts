import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      skills: {
        include: { skill: true },
      },
    },
  });

  return Response.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

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
  } = body;

  const invite = await prisma.invite.findFirst({
    where: { email, code: inviteCode, used: false },
  });

  if (!invite) {
    return Response.json(
      { error: 'Convite inválido ou já utilizado.' },
      { status: 403 }
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
