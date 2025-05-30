import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      skills: {
        include: { skill: true },
      },
    },
  });

  if (!user) {
    return new Response('Usuário não encontrado', { status: 404 });
  }

  return Response.json(user);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const {
    name,
    email,
    password,
    avatar,
    linkedin,
    github,
    bio,
    skills, // Array de skillIds
  } = body;

  const hashedPassword = password ? await hash(password, 10) : undefined;

  const user = await prisma.user.update({
    where: { id: params.id },
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
            deleteMany: {}, // Remove todas as skills atuais
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

  return Response.json(user);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.user.delete({
    where: { id: params.id },
  });

  return new Response(null, { status: 204 });
}
