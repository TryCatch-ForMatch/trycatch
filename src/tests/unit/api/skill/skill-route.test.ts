/**
 * @jest-environment node
 */

import { GET, POST } from '@/app/api/skill/route';
import { GET as GET_COUNT } from '@/app/api/skill/count/route';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    skill: {
      count: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

type MockRequest = {
  json: () => Promise<unknown>;
};

const authorizeAdmin = () => {
  (checkAuth as jest.Mock).mockResolvedValue({
    authorized: true,
    session: {
      user: { id: 'admin-1', role: 'ADMIN' },
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

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(skills);
    expect(prisma.skill.findMany).toHaveBeenCalledWith({
      orderBy: { name: 'asc' },
    });
  });
});

describe('POST /api/skill', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeAdmin();
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as jest.Mock;
  });

  it('deve criar skill quando nome for válido e não existir conflito', async () => {
    (prisma.skill.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.skill.create as jest.Mock).mockResolvedValue({
      id: 'skill-1',
      name: 'React',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'React',
      }),
    };

    const response = await POST(request as NextRequest);
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
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
    });
  });

  it('deve retornar 400 quando payload for inválido', async () => {
    const request: MockRequest = {
      json: async () => ({
        name: '',
      }),
    };

    const response = await POST(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.skill.create).not.toHaveBeenCalled();
  });

  it('deve retornar 400 quando ícone não existir no Devicon', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false }) as jest.Mock;

    const request: MockRequest = {
      json: async () => ({
        name: 'UnknownSkill',
      }),
    };

    const response = await POST(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.message).toBe('Ícone não encontrado no repositório Devicon.');
    expect(prisma.skill.create).not.toHaveBeenCalled();
  });

  it('deve retornar 409 quando skill já existir', async () => {
    (prisma.skill.findUnique as jest.Mock).mockResolvedValue({
      id: 'skill-existing',
      name: 'React',
    });

    const request: MockRequest = {
      json: async () => ({
        name: 'React',
      }),
    };

    const response = await POST(request as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);
    expect(prisma.skill.create).not.toHaveBeenCalled();
  });

  it('deve bloquear criação para usuário não autorizado', async () => {
    const authResponse = Response.json(
      { error: 'Acesso negado.' },
      { status: 403 }
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

    const response = await POST(request as NextRequest);

    expect(response.status).toBe(403);
    expect(prisma.skill.create).not.toHaveBeenCalled();
  });
});

describe('GET /api/skill/count', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar total de skills', async () => {
    (prisma.skill.count as jest.Mock).mockResolvedValue(4);

    const response = await GET_COUNT();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ count: 4 });
    expect(prisma.skill.count).toHaveBeenCalledWith();
  });
});
