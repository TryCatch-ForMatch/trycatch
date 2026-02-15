/**
 * @jest-environment node
 */

import { GET } from '@/app/api/portfolio/summary/route';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
    },
  },
}));

describe('GET /api/portfolio/summary', () => {
  it('should return only public active users', async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      {
        id: 'user-1',
        name: 'Public User',
        avatar: null,
        role: 'USER',
        github: 'https://github.com/test',
        linkedin: null,
        bio: null,
        showGithub: true,
        showLinkedin: true,
        showFeedback: true,
        skills: [],
        feedbacksReceived: [],
      },
    ]);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.length).toBe(1);
    expect(body[0].id).toBe('user-1');
  });

  it('should hide github when showGithub is false', async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      {
        id: 'user-1',
        name: 'User Test',
        avatar: null,
        role: 'USER',
        github: 'https://github.com/test',
        linkedin: null,
        bio: null,
        showGithub: false,
        showLinkedin: true,
        showFeedback: true,
        skills: [],
        feedbacksReceived: [],
      },
    ]);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body[0].github).toBeNull();
  });
});
