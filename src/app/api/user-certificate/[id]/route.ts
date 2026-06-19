import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/check-auth';
import { ROLE_GROUPS } from '@/lib/roles';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { z } from 'zod';

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  url: z.string().url().optional(),
  issuer: z.string().min(1).optional(),
  date: z.string().optional(),
  description: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const certificate = await prisma.userCertificate.findUnique({
    where: { id: params.id },
  });

  if (!certificate) {
    return buildResponse({
      success: false,
      message: MESSAGES.USER_CERTIFICATE.NOT_FOUND,
      status: 404,
    });
  }

  // Owner ou admin
  if (certificate.userId !== session.user.id && session.user.role !== 'ADMIN') {
    return buildResponse({
      success: false,
      message: MESSAGES.AUTH.UNAUTHORIZED,
      status: 403,
    });
  }

  return NextResponse.json(certificate, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const body = await request.json();
  const parsed = updateSchema.safeParse(body);

  if (!parsed.success) {
    return buildResponse({
      success: false,
      message: MESSAGES.GENERAL.INVALID_DATA,
      errors: parsed.error.format(),
      status: 400,
    });
  }

  const existing = await prisma.userCertificate.findUnique({
    where: { id: params.id },
  });

  if (!existing) {
    return buildResponse({
      success: false,
      message: MESSAGES.USER_CERTIFICATE.NOT_FOUND,
      status: 404,
    });
  }

  if (existing.userId !== session.user.id && session.user.role !== 'ADMIN') {
    return buildResponse({
      success: false,
      message: MESSAGES.AUTH.UNAUTHORIZED,
      status: 403,
    });
  }

  const updated = await prisma.userCertificate.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return buildResponse({
    success: true,
    message: MESSAGES.USER_CERTIFICATE.UPDATED,
    data: updated,
    status: 200,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  const certificate = await prisma.userCertificate.findUnique({
    where: { id: params.id },
  });

  if (!certificate) {
    return buildResponse({
      success: false,
      message: MESSAGES.USER_CERTIFICATE.NOT_FOUND,
      status: 404,
    });
  }

  if (certificate.userId !== session.user.id && session.user.role !== 'ADMIN') {
    return buildResponse({
      success: false,
      message: MESSAGES.AUTH.UNAUTHORIZED,
      status: 403,
    });
  }

  await prisma.userCertificate.delete({
    where: { id: params.id },
  });

  return buildResponse({
    success: true,
    message: MESSAGES.USER_CERTIFICATE.DELETED,
    status: 200,
  });
}
