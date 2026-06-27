/**
 * @jest-environment node
 */

import { GET, POST } from '@/app/api/skill/route';
import { GET as GET_COUNT } from '@/app/api/skill/count/route';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    skill: {
      count: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

jest.mock('@/lib/normalize-skill-name', () => ({
  normalizeSkillName: jest.fn((name: string) =>
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
  ),

  formatSkillName: jest.fn((name: string) =>
    name
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  ),
}));

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

type MockRequest = {
  json: () => Promise<unknown>;
};

const authorizeUser = () => {
  (checkAuth as jest.Mock).mockResolvedValue({
    authorized: true,
    session: {
      user: {
        id: 'user-1',
        role: 'USER',
      },
    },
  });
};

describe('GET /api/skill', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve listar skills em ordem alfabética', async () => {
    const skills = [
      {
        id: 'skill-1',
        name: 'React',
        iconUrl: 'https://cdn.example.com/react.svg',
      },
    ];

    (prisma.skill.findMany as jest.Mock).mockResolvedValue(skills);

    const response = (await GET()) as Response;
    const body = await response.json();

    expect(response.status).toBe(200);

    expect(body).toEqual(skills);

    expect(prisma.skill.findMany).toHaveBeenCalledWith({
      orderBy: {
        name: 'asc',
      },
    });
  });

  it('deve retornar 500 quando ocorrer erro ao buscar skills', async () => {
    (prisma.skill.findMany as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = (await GET()) as Response;
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);

    expect(logger.error).toHaveBeenCalled();
  });
});

describe('POST /api/skill', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    authorizeUser();

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    }) as jest.Mock;
  });

  it('deve criar skill quando nome for válido e não existir conflito', async () => {
    (prisma.skill.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.skill.create as jest.Mock).mockResolvedValue({
      id: 'skill-1',
      name: 'React',
      normalizedName: 'react',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'React',
      }),
    };

    const response = (await POST(request as NextRequest)) as Response;
    const body = await response.json();

    expect(response.status).toBe(201);

    expect(body.success).toBe(true);
    expect(body.data.name).toBe('React');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    );

    expect(prisma.skill.create).toHaveBeenCalledWith({
      data: {
        name: 'React',
        normalizedName: 'react',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
    });
  });

  it('deve criar skill sem ícone quando Devicon não possuir o arquivo', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    }) as jest.Mock;

    (prisma.skill.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.skill.create as jest.Mock).mockResolvedValue({
      id: 'skill-1',
      name: 'Unknownskill',
      normalizedName: 'unknownskill',
      iconUrl: null,
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'UnknownSkill',
      }),
    };

    const response = (await POST(request as NextRequest)) as Response;
    const body = await response.json();

    expect(response.status).toBe(201);

    expect(prisma.skill.create).toHaveBeenCalledWith({
      data: {
        name: 'Unknownskill',
        normalizedName: 'unknownskill',
        iconUrl: null,
      },
    });

    expect(body.success).toBe(true);
  });

  it('deve usar iconUrl fornecida pelo usuário', async () => {
    (prisma.skill.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.skill.create as jest.Mock).mockResolvedValue({
      id: 'skill-1',
      name: 'React',
      normalizedName: 'react',
      iconUrl: 'https://meusite.com/react.svg',
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'React',
        iconUrl: 'https://meusite.com/react.svg',
      }),
    };

    const response = (await POST(request as NextRequest)) as Response;

    expect(response.status).toBe(201);

    expect(global.fetch).not.toHaveBeenCalled();

    expect(prisma.skill.create).toHaveBeenCalledWith({
      data: {
        name: 'React',
        normalizedName: 'react',
        iconUrl: 'https://meusite.com/react.svg',
      },
    });
  });

  it('deve retornar 400 quando payload for inválido', async () => {
    const request: MockRequest = {
      json: async () => ({
        name: '',
      }),
    };

    const response = (await POST(request as NextRequest)) as Response;
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);

    expect(prisma.skill.create).not.toHaveBeenCalled();
  });

  it('deve retornar 400 quando iconUrl for inválida', async () => {
    const request: MockRequest = {
      json: async () => ({
        name: 'React',
        iconUrl: 'url-invalida',
      }),
    };

    const response = (await POST(request as NextRequest)) as Response;
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);

    expect(prisma.skill.create).not.toHaveBeenCalled();
  });

  it('deve retornar 409 quando skill já existir', async () => {
    (prisma.skill.findFirst as jest.Mock).mockResolvedValue({
      id: 'skill-existing',
      normalizedName: 'react',
      name: 'React',
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'React',
      }),
    };

    const response = (await POST(request as NextRequest)) as Response;
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);

    expect(prisma.skill.create).not.toHaveBeenCalled();
  });

  it('deve bloquear criação quando usuário não estiver autenticado', async () => {
    const authResponse = Response.json(
      {
        error: 'Não autenticado.',
      },
      {
        status: 401,
      }
    );

    (checkAuth as jest.Mock).mockResolvedValue({
      authorized: false,
      response: authResponse,
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'React',
      }),
    };

    const response = (await POST(request as NextRequest)) as Response;

    expect(response.status).toBe(401);

    expect(prisma.skill.create).not.toHaveBeenCalled();
  });

  it('deve retornar 500 quando ocorrer erro ao criar skill', async () => {
    (prisma.skill.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.skill.create as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const request: MockRequest = {
      json: async () => ({
        name: 'React',
      }),
    };

    const response = (await POST(request as NextRequest)) as Response;
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);

    expect(logger.error).toHaveBeenCalled();
  });

  it('deve criar skill com iconUrl null quando não existir iconUrl e o Devicon falhar', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network error'));

    (prisma.skill.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.skill.create as jest.Mock).mockResolvedValue({
      id: 'skill-1',
      name: 'Scrum',
      normalizedName: 'scrum',
      iconUrl: null,
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'Scrum',
      }),
    };

    const response = (await POST(request as NextRequest)) as Response;

    expect(response.status).toBe(201);

    expect(prisma.skill.create).toHaveBeenCalledWith({
      data: {
        name: 'Scrum',
        normalizedName: 'scrum',
        iconUrl: null,
      },
    });
  });
});

describe('GET /api/skill/count', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar total de skills', async () => {
    (prisma.skill.count as jest.Mock).mockResolvedValue(4);

    const response = (await GET_COUNT()) as Response;
    const body = await response.json();

    expect(response.status).toBe(200);

    expect(body).toEqual({
      count: 4,
    });

    expect(prisma.skill.count).toHaveBeenCalledWith();
  });
});
