/**
 * @jest-environment node
 */

import { GET } from '@/app/api/portfolio/[id]/route';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

describe('GET /api/portfolio/[id]', () => {
  it('should return 404 when user does not exist', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const request = {} as NextRequest;

    const response = await GET(request, {
      params: { id: 'non-existent-id' },
    });

    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.success).toBe(false);
  });

  it('should return 403 when portfolio is private', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'user-1',
      name: 'Test User',
      role: 'USER',
      avatar: null,
      bio: null,
      github: null,
      linkedin: null,
      email: 'test@test.com',
      isActive: true,
      showEmail: true,
      showGithub: true,
      showLinkedin: true,
      showCertificates: true,
      showProjects: true,
      showFeedback: true,
      portfolioPublic: false,
      skills: [],
      certificates: [],
      feedbacksReceived: [],
      stacksTaken: [],
    });

    const request = {} as NextRequest;

    const response = await GET(request, {
      params: { id: 'user-1' },
    });

    expect(response.status).toBe(403);
  });

  it('should hide email when showEmail is false', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'user-1',
      name: 'Test User',
      role: 'USER',
      avatar: null,
      bio: null,
      github: null,
      linkedin: null,
      email: 'test@test.com',
      isActive: true,
      showEmail: false,
      showGithub: true,
      showLinkedin: true,
      showCertificates: true,
      showProjects: true,
      showFeedback: true,
      portfolioPublic: true,
      skills: [],
      certificates: [],
      feedbacksReceived: [],
      stacksTaken: [],
    });

    const request = {} as NextRequest;

    const response = await GET(request, {
      params: { id: 'user-1' },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.email).toBeNull();
  });

  it('should hide feedbacks when showFeedback is false', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'user-1',
      name: 'Test User',
      role: 'USER',
      avatar: null,
      bio: null,
      github: null,
      linkedin: null,
      email: 'test@test.com',
      isActive: true,
      showEmail: true,
      showGithub: true,
      showLinkedin: true,
      showCertificates: true,
      showProjects: true,
      showFeedback: false,
      portfolioPublic: true,
      skills: [],
      certificates: [],
      feedbacksReceived: [
        {
          rating: 5,
          fromUser: {
            name: 'Another User',
            avatar: null,
          },
        },
      ],
      stacksTaken: [],
    });

    const request = {} as NextRequest;

    const response = await GET(request, {
      params: { id: 'user-1' },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.feedbacks).toEqual([]);
  });
});
