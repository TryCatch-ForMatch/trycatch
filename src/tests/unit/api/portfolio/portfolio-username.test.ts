/**
 * @jest-environment node
 */

import { GET } from '@/app/api/portfolio/[username]/route';
import {
  getPublicPortfolio,
  PortfolioNotFoundError,
} from '@/lib/portfolio.service';
import { NextRequest } from 'next/server';

jest.mock('@/lib/portfolio.service', () => ({
  getPublicPortfolio: jest.fn(),
  PortfolioNotFoundError: class PortfolioNotFoundError extends Error {},
}));

jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

describe('GET /api/portfolio/[username]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 when user does not exist', async () => {
    (getPublicPortfolio as jest.Mock).mockRejectedValue(
      new PortfolioNotFoundError()
    );

    const response = await GET({} as NextRequest, {
      params: Promise.resolve({ username: 'non-existent-id' }),
    });

    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.success).toBe(false);
  });

  it('should return 404 when portfolio is private', async () => {
    (getPublicPortfolio as jest.Mock).mockRejectedValue(
      new PortfolioNotFoundError()
    );

    const response = await GET({} as NextRequest, {
      params: Promise.resolve({ username: 'user-private' }),
    });

    expect(response.status).toBe(404);
  });

  it('should return portfolio hiding email when service returns hidden email', async () => {
    (getPublicPortfolio as jest.Mock).mockResolvedValue({
      username: 'user-1',
      name: 'Test User',
      projects: [],
    });

    const response = await GET({} as NextRequest, {
      params: Promise.resolve({ username: 'user-1' }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.email).toBeUndefined();
  });

  it('should return portfolio hiding feedback when service returns hidden feedback', async () => {
    (getPublicPortfolio as jest.Mock).mockResolvedValue({
      username: 'user-1',
      name: 'Test User',
      projects: [],
    });

    const response = await GET({} as NextRequest, {
      params: Promise.resolve({ username: 'user-1' }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.feedback).toBeUndefined();
  });

  it('should return projects from service', async () => {
    (getPublicPortfolio as jest.Mock).mockResolvedValue({
      username: 'user-1',
      name: 'Test User',
      projects: [
        {
          projectId: 'p1',
          projectName: 'Projeto 1',
          stacks: [{ stackName: 'Backend' }],
        },
      ],
    });

    const response = await GET({} as NextRequest, {
      params: Promise.resolve({ username: 'user-1' }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.projects).toHaveLength(1);
    expect(body.data.projects[0].projectId).toBe('p1');
    expect(body.data.projects[0].stacks).toHaveLength(1);
    expect(body.data.projects[0].stacks[0].stackName).toBe('Backend');
  });

  it('should return grouped stacks when service returns grouped project', async () => {
    (getPublicPortfolio as jest.Mock).mockResolvedValue({
      username: 'user-1',
      name: 'Test User',
      projects: [
        {
          projectId: 'p1',
          projectName: 'Projeto 1',
          stacks: [{ stackName: 'Backend' }, { stackName: 'Frontend' }],
        },
      ],
    });

    const response = await GET({} as NextRequest, {
      params: Promise.resolve({ username: 'user-1' }),
    });

    const body = await response.json();

    expect(body.data.projects).toHaveLength(1);
    expect(body.data.projects[0].stacks).toHaveLength(2);
  });

  it('should return 500 on unexpected error', async () => {
    (getPublicPortfolio as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = await GET({} as NextRequest, {
      params: Promise.resolve({ username: 'user-1' }),
    });

    expect(response.status).toBe(500);
  });

  it('should return 404 when user is inactive', async () => {
    (getPublicPortfolio as jest.Mock).mockRejectedValue(
      new PortfolioNotFoundError()
    );

    const response = await GET({} as NextRequest, {
      params: Promise.resolve({ username: 'user-1' }),
    });

    expect(response.status).toBe(404);
  });
});
