/**
 * @jest-environment node
 */

import { GET } from '@/app/api/portfolio/summary/route';
import * as portfolioService from '@/lib/portfolio.service';

jest.mock('@/lib/portfolio.service', () => ({
  listPortfolioSummary: jest.fn(),
}));

function makeRequest(params: Record<string, string> = {}) {
  const url = new URL('http://localhost/api/portfolio/summary');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return { nextUrl: url } as unknown as import('next/server').NextRequest;
}

describe('GET /api/portfolio/summary', () => {
  const mockItem = {
    id: 'user-1',
    name: 'Public User',
    userName: 'public_user',
    avatar: null,
    role: 'USER',
    github: 'https://github.com/test',
    linkedin: null,
    bio: null,
    showGithub: true,
    showLinkedin: true,
    skills: [],
    feedbackCount: 0,
  };

  it('should return paginated portfolio summary', async () => {
    (portfolioService.listPortfolioSummary as jest.Mock).mockResolvedValue({
      items: [mockItem],
      hasNextPage: false,
      nextCursor: null,
    });

    const response = await GET(makeRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.items).toHaveLength(1);
    expect(body.data.items[0].id).toBe('user-1');
  });

  it('should pass role filter to service', async () => {
    (portfolioService.listPortfolioSummary as jest.Mock).mockResolvedValue({
      items: [],
      hasNextPage: false,
      nextCursor: null,
    });

    await GET(makeRequest({ role: 'MENTOR' }));

    expect(portfolioService.listPortfolioSummary).toHaveBeenCalledWith(
      expect.objectContaining({ role: 'MENTOR' }),
      undefined,
      20
    );
  });

  it('should return 400 for invalid take param', async () => {
    const response = await GET(makeRequest({ take: 'abc' }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
  });
});
