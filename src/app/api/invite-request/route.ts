import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { z } from 'zod';

const inviteRequestSchema = z.object({
  name: z.string().min(3, 'Nome inválido'),
  email: z.string().email('Email inválido'),
  linkedin: z
    .string()
    .url('LinkedIn inválido')
    .refine(
      (url) =>
        url.startsWith('https://www.linkedin.com/') ||
        url.startsWith('https://linkedin.com/'),
      'URL do LinkedIn inválida'
    ),
  role: z.enum(['USER', 'MENTOR']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = inviteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return buildResponse({
        success: false,
        message: MESSAGES.GENERAL.INVALID_DATA,
        status: 400,
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, email, linkedin, role } = parsed.data;

    const existingRequest = await prisma.inviteRequest.findUnique({
      where: { email },
    });

    if (existingRequest) {
      return buildResponse({
        success: false,
        message: MESSAGES.INVITE_REQUEST.ALREADY_EXISTS,
        status: 409,
      });
    }

    const inviteRequest = await prisma.inviteRequest.create({
      data: {
        name,
        email,
        linkedin,
        role,
      },
    });

    return buildResponse({
      success: true,
      message: MESSAGES.INVITE_REQUEST.CREATED,
      data: {
        id: inviteRequest.id,
        status: inviteRequest.status,
      },
      status: 201,
    });
  } catch {
    return buildResponse({
      success: false,
      message: MESSAGES.INVITE_REQUEST.GENERAL_ERROR,
      status: 500,
    });
  }
}
