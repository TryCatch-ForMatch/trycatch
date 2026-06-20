/**
 * @jest-environment node
 */

import { DELETE, GET, PATCH } from '@/app/api/skill/[id]/route';
import { checkAuth } from '@/lib/check-auth';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    projectSkill: {
      findFirst: jest.fn(),
    },
    skill: {
      delete: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    userSkill: {
      findFirst: jest.fn(),
    },
  },
}));

jest.mock('@/lib/check-auth', () => ({
  checkAuth: jest.fn(),
}));

type MockRequest = {
  json?: () => Promise<unknown>;
  nextUrl: {
    pathname: string;
  };
};

const createRequest = (id = 'skill-1', body?: unknown) =>
  ({
    nextUrl: {
      pathname: `/api/skill/${id}`,
    },
    json: body === undefined ? undefined : async () => body,
  }) as MockRequest as NextRequest;

const authorizeAdmin = () => {
  (checkAuth as jest.Mock).mockResolvedValue({
    authorized: true,
    session: {
      user: { id: 'admin-1', role: 'ADMIN' },
    },
  });
};

describe('GET /api/skill/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar skill pelo id', async () => {
    const skill = {
      id: 'skill-1',
      name: 'React',
      iconUrl: 'https://cdn.example.com/react.svg',
    };

    (prisma.skill.findUnique as jest.Mock).mockResolvedValue(skill);

    const response = await GET(createRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(skill);
    expect(prisma.skill.findUnique).toHaveBeenCalledWith({
      where: { id: 'skill-1' },
    });
  });

  it('deve retornar 404 quando skill não existir', async () => {
    (prisma.skill.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await GET(createRequest('missing-skill'));
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.success).toBe(false);
  });
});

describe('PATCH /api/skill/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeAdmin();
  });

  it('deve atualizar skill quando não houver conflito', async () => {
    (prisma.skill.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.projectSkill.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.userSkill.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.skill.update as jest.Mock).mockResolvedValue({
      id: 'skill-1',
      name: 'Vue',
      iconUrl: 'https://cdn.example.com/vue.svg',
    });

    const response = await PATCH(
      createRequest('skill-1', {
        name: 'Vue',
        iconUrl: 'https://cdn.example.com/vue.svg',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.name).toBe('Vue');
    expect(prisma.skill.update).toHaveBeenCalledWith({
      where: { id: 'skill-1' },
      data: {
        name: 'Vue',
        iconUrl: 'https://cdn.example.com/vue.svg',
      },
    });
  });

  it('deve retornar 400 quando payload for inválido', async () => {
    const response = await PATCH(
      createRequest('skill-1', {
        name: '',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.skill.update).not.toHaveBeenCalled();
  });

  it('deve retornar 409 quando nome já existir em outra skill', async () => {
    (prisma.skill.findFirst as jest.Mock).mockResolvedValue({
      id: 'skill-2',
      name: 'React',
    });

    const response = await PATCH(
      createRequest('skill-1', {
        name: 'React',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);
    expect(prisma.skill.update).not.toHaveBeenCalled();
  });

  it('deve retornar 409 quando skill estiver vinculada e forceUpdate não for enviado', async () => {
    (prisma.skill.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.projectSkill.findFirst as jest.Mock).mockResolvedValue({
      id: 'project-skill-1',
    });
    (prisma.userSkill.findFirst as jest.Mock).mockResolvedValue(null);

    const response = await PATCH(
      createRequest('skill-1', {
        name: 'React Native',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.success).toBe(false);
    expect(prisma.skill.update).not.toHaveBeenCalled();
  });

  it('deve permitir atualização vinculada quando forceUpdate for true', async () => {
    (prisma.skill.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.projectSkill.findFirst as jest.Mock).mockResolvedValue({
      id: 'project-skill-1',
    });
    (prisma.userSkill.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.skill.update as jest.Mock).mockResolvedValue({
      id: 'skill-1',
      name: 'React Native',
      iconUrl: undefined,
    });

    const response = await PATCH(
      createRequest('skill-1', {
        name: 'React Native',
        forceUpdate: true,
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.name).toBe('React Native');
    expect(prisma.skill.update).toHaveBeenCalledWith({
      where: { id: 'skill-1' },
      data: {
        name: 'React Native',
        iconUrl: undefined,
      },
    });
  });
});

describe('DELETE /api/skill/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authorizeAdmin();
  });

  it('deve deletar skill sem vínculos', async () => {
    (prisma.userSkill.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.projectSkill.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.skill.delete as jest.Mock).mockResolvedValue({
      id: 'skill-1',
    });

    const response = await DELETE(createRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(prisma.skill.delete).toHaveBeenCalledWith({
      where: { id: 'skill-1' },
    });
  });

  it('deve bloquear remoção quando skill estiver em uso', async () => {
    (prisma.userSkill.findFirst as jest.Mock).mockResolvedValue({
      id: 'user-skill-1',
    });
    (prisma.projectSkill.findFirst as jest.Mock).mockResolvedValue(null);

    const response = await DELETE(createRequest());
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(prisma.skill.delete).not.toHaveBeenCalled();
  });
});
