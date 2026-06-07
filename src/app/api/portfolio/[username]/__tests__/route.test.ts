// src/app/api/portfolio/[username]/__tests__/route.test.ts
//
// Testes dos critérios de aceite da issue #525 e #527.
// Referência de setup: docs/04-processo/testes-backend.md
//
// Para rodar: DATABASE_URL="postgresql://postgres:postgres@localhost:5433/trycatch_local" \
//               npx jest src/app/api/portfolio

import { GET } from '../route';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeRequest(username: string) {
  return new NextRequest(`http://localhost/api/portfolio/${username}`);
}

function makeParams(username: string) {
  return { params: Promise.resolve({ username }) };
}

// ---------------------------------------------------------------------------
// Cenário 1: portfólio público — todos os campos visíveis
// ---------------------------------------------------------------------------
describe('GET /api/portfolio/[username] — portfólio público completo', () => {
  it('retorna 200 com todos os campos quando todos os toggles estão ativos', async () => {
    const res = await GET(makeRequest('joao_public'), makeParams('joao_public'));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.username).toBe('joao_public');
    expect(body.data.email).toBeDefined();   // showEmail = true
    expect(body.data.github).toBeDefined();  // showGithub = true
    expect(body.data.projects).toBeDefined(); // showProjects = true
    expect(body.data.certificates).toBeDefined(); // showCertificates = true
    expect(body.data.feedback).toBeDefined(); // showFeedback = true
  });

  it('nunca retorna o id interno do usuário', async () => {
    const res = await GET(makeRequest('joao_public'), makeParams('joao_public'));
    const body = await res.json();

    expect(body.data.id).toBeUndefined();
    expect(body.data.password).toBeUndefined();
    expect(body.data.isActive).toBeUndefined();
    expect(body.data.portfolioPublic).toBeUndefined();
  });

  it('agrupa múltiplas stacks do mesmo projeto em um único item', async () => {
    const res = await GET(makeRequest('joao_public'), makeParams('joao_public'));
    const body = await res.json();

    const projects: Array<{ projectId: string; stacks: unknown[] }> = body.data.projects;

    // joao_public assumiu Frontend e Backend no mesmo projeto (seed.local.ts)
    const plataformaProject = projects.find(
      (p) => p.projectId === 'seed-project-concluido',
    );

    expect(plataformaProject).toBeDefined();
    expect(plataformaProject?.stacks.length).toBe(2); // Frontend + Backend
  });

  it('não retorna projetos que não são CONCLUIDO', async () => {
    const res = await GET(makeRequest('joao_public'), makeParams('joao_public'));
    const body = await res.json();

    const projects: Array<{ projectId: string }> = body.data.projects;
    const ids = projects.map((p) => p.projectId);

    // seed-project-andamento tem status EM_ANDAMENTO — não deve aparecer
    expect(ids).not.toContain('seed-project-andamento');
  });
});

// ---------------------------------------------------------------------------
// Cenário 2: portfólio público com campos ocultos
// ---------------------------------------------------------------------------
describe('GET /api/portfolio/[username] — campos ocultos por toggle', () => {
  it('retorna 200 mas sem email quando showEmail = false', async () => {
    const res = await GET(makeRequest('maria_parcial'), makeParams('maria_parcial'));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.email).toBeUndefined(); // showEmail = false
  });

  it('retorna 200 mas sem certificados quando showCertificates = false', async () => {
    const res = await GET(makeRequest('maria_parcial'), makeParams('maria_parcial'));
    const body = await res.json();

    expect(body.data.certificates).toBeUndefined(); // showCertificates = false
  });

  it('retorna 200 mas sem feedback quando showFeedback = false', async () => {
    const res = await GET(makeRequest('maria_parcial'), makeParams('maria_parcial'));
    const body = await res.json();

    expect(body.data.feedback).toBeUndefined(); // showFeedback = false
  });

  it('nunca retorna o email no campo data quando toggle está desativado', async () => {
    // Garante que o email não "vaza" em nenhuma forma no payload
    const res = await GET(makeRequest('maria_parcial'), makeParams('maria_parcial'));
    const rawBody = await res.text();

    const user = await prisma.user.findUnique({
      where: { userName: 'maria_parcial' },
      select: { email: true },
    });

    // O email real não deve aparecer em nenhuma parte da resposta
    expect(rawBody).not.toContain(user?.email);
  });
});

// ---------------------------------------------------------------------------
// Cenário 3: portfólio privado — deve retornar 404
// ---------------------------------------------------------------------------
describe('GET /api/portfolio/[username] — portfólio privado', () => {
  it('retorna 404 quando portfolioPublic = false', async () => {
    const res = await GET(makeRequest('carlos_private'), makeParams('carlos_private'));

    expect(res.status).toBe(404);
  });

  it('não retorna 403 (não pode revelar que o usuário existe)', async () => {
    const res = await GET(makeRequest('carlos_private'), makeParams('carlos_private'));

    expect(res.status).not.toBe(403);
  });
});

// ---------------------------------------------------------------------------
// Cenário 4: usuário inativo — deve retornar 404
// ---------------------------------------------------------------------------
describe('GET /api/portfolio/[username] — usuário inativo', () => {
  it('retorna 404 quando isActive = false', async () => {
    const res = await GET(makeRequest('ana_inactive'), makeParams('ana_inactive'));

    expect(res.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// Cenário 5: usuário inexistente
// ---------------------------------------------------------------------------
describe('GET /api/portfolio/[username] — usuário inexistente', () => {
  it('retorna 404 para username que não existe', async () => {
    const res = await GET(makeRequest('usuario_que_nao_existe_xyz'), makeParams('usuario_que_nao_existe_xyz'));

    expect(res.status).toBe(404);
  });

  it('o body segue a estrutura padrão de resposta da API', async () => {
    const res = await GET(makeRequest('usuario_que_nao_existe_xyz'), makeParams('usuario_que_nao_existe_xyz'));
    const body = await res.json();

    // Estrutura padrão: { success, message, data, errors }
    expect(body).toHaveProperty('success', false);
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data', null);
    expect(body).toHaveProperty('errors', null);
  });
});
