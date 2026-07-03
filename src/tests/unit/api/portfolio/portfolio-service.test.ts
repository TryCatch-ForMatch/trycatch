import { TextEncoder, TextDecoder } from 'util';

Object.defineProperty(global, 'TextEncoder', {
  value: TextEncoder,
  writable: true,
});

Object.defineProperty(global, 'TextDecoder', {
  value: TextDecoder,
  writable: true,
});

jest.mock('@prisma/client', () => ({
  ProjectStatus: {
    EM_ANDAMENTO: 'EM_ANDAMENTO',
    CONCLUIDO: 'CONCLUIDO',
  },
}));

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

let ProjectStatus: typeof import('@prisma/client').ProjectStatus;
let prisma: { user: { findUnique: jest.Mock } };
let getPublicPortfolio: (username: string) => Promise<{
  projects?: Array<{
    projectName: string;
    stacks: Array<{ stackName: string }>;
    status?: string;
  }>;
}>;

beforeAll(async () => {
  ({ ProjectStatus } = await import('@prisma/client'));
  ({ prisma } = await import('@/lib/prisma'));
  ({ getPublicPortfolio } = await import('@/lib/portfolio.service'));
});

describe('getPublicPortfolio', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should include projects in progress when the user assumed stacks there', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      userName: 'user-1',
      name: 'Test User',
      bio: null,
      avatar: null,
      isActive: true,
      portfolioPublic: true,
      showEmail: false,
      showGithub: false,
      showLinkedin: false,
      showCertificates: false,
      showProjects: true,
      showFeedback: false,
      email: null,
      github: null,
      linkedin: null,
      skills: [],
      stacksTaken: [
        {
          stackId: 'stack-1',
          stack: { name: 'Frontend' },
          project: {
            id: 'project-1',
            name: 'Projeto em andamento',
            description: 'Descrição',
            deadline: new Date('2026-08-01T00:00:00.000Z'),
            status: ProjectStatus.EM_ANDAMENTO,
          },
        },
        {
          stackId: 'stack-2',
          stack: { name: 'Backend' },
          project: {
            id: 'project-2',
            name: 'Projeto concluído',
            description: 'Descrição 2',
            deadline: new Date('2025-01-01T00:00:00.000Z'),
            status: ProjectStatus.CONCLUIDO,
          },
        },
      ],
      certificates: [],
      feedbacksReceived: [],
    });

    const response = await getPublicPortfolio('user-1');

    expect(response.projects).toHaveLength(2);
    expect(response.projects?.[0].projectName).toBe('Projeto em andamento');
    expect(response.projects?.[0].stacks[0].stackName).toBe('Frontend');
    expect(response.projects?.[0]).toHaveProperty(
      'status',
      ProjectStatus.EM_ANDAMENTO
    );
  });
});
