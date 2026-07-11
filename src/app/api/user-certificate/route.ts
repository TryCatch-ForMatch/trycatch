import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { ROLE_GROUPS } from '@/lib/roles';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { z } from 'zod';

const createCertificateSchema = z.object({
  title: z.string().min(1, 'Título obrigatório'),
  url: z.url('URL inválida').optional(),
  issuer: z.string().min(1, 'Emissor obrigatório'),
  date: z.string().min(1, 'Data obrigatória'), // mês/ano
  description: z.string().optional(),
});

export async function GET() {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const certificates = await prisma.userCertificate.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(certificates, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const body = await request.json();
  const parsed = createCertificateSchema.safeParse(body);

  if (!parsed.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: parsed.error.format(),
      status: 400,
    });
  }

  const certificate = await prisma.userCertificate.create({
    data: {
      userId: session.user.id,
      ...parsed.data,
    },
  });

  return buildResponse({
    success: true,
    message: MESSAGES.USER_CERTIFICATE.CREATED,
    data: certificate,
    status: 201,
  });
}
