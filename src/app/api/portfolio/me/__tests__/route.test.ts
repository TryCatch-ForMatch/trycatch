// src/app/api/portfolio/me/__tests__/route.test.ts
//
// Testes do endpoint privado GET e PATCH /api/portfolio/me
//
// O endpoint usa checkAuth() que internamente chama getServerSession().
// Nos testes, mockamos getServerSession para simular diferentes estados
// de autenticação sem precisar de um servidor NextAuth rodando.
//
// Para rodar:
//   DATABASE_URL="postgresql://postgres:postgres@localhost:5433/trycatch_local" \
//     npx jest src/app/api/portfolio/me

import { GET, PATCH } from '../route';
import { NextRequest } from 'next/server';

// ---------------------------------------------------------------------------
// Mock do NextAuth — substitui getServerSession em todos os módulos
// ---------------------------------------------------------------------------
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

// O checkAuth importa getServerSession de next-auth internamente,
// então mockamos no mesmo caminho que ele usa
jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(),
}));

// Importa DEPOIS do mock para pegar a versão mockada
import { getServerSession } from 'next-auth/next';

const mockGetServerSession = getServerSession as jest.Mock;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeRequest(body?: object) {
  return new NextRequest('http://localhost/api/portfolio/me', {
    method: body ? 'PATCH' : 'GET',
    ...(body && {
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }),
  });
}

/** Sessão válida apontando para joao_public do seed local */
function mockAuthenticatedSession(overrides?: object) {
  mockGetServerSession.mockResolvedValue({
    user: {
      id: 'seed-user-joao-public', // deve bater com o id real do seed
      name: 'João Portfólio Público',
      email: 'joao_public@test.com',
      role: 'USER',
      ...overrides,
    },
  });
}

/** Simula ausência de sessão (não autenticado) */
function mockUnauthenticated() {
  mockGetServerSession.mockResolvedValue(null);
}

// ---------------------------------------------------------------------------
// GET /api/portfolio/me
// ---------------------------------------------------------------------------
describe('GET /api/portfolio/me', () => {
  beforeEach(() => jest.clearAllMocks());

  it('retorna 401 quando não há sessão', async () => {
    mockUnauthenticated();

    const res = await GET();

    expect(res?.status).toBe(401);
  });

  it('retorna 200 com os dados do usuário autenticado', async () => {
    mockAuthenticatedSession();

    const res = await GET();
    const body = await res?.json();

    expect(res?.status).toBe(200);
    // A resposta inclui os dados completos — incluindo campos privados
    // como email e toggles (diferente da resposta pública)
    expect(body).toHaveProperty('showEmail');
    expect(body).toHaveProperty('showGithub');
    expect(body).toHaveProperty('showLinkedin');
    expect(body).toHaveProperty('showCertificates');
    expect(body).toHaveProperty('showProjects');
    expect(body).toHaveProperty('showFeedback');
    expect(body).toHaveProperty('portfolioPublic');
  });

  it('nunca retorna dados de outro usuário — sempre usa o id da sessão', async () => {
    // Mesmo que alguém manipule a request, o endpoint ignora qualquer
    // parâmetro externo e usa exclusivamente session.user.id
    mockAuthenticatedSession();

    const res = await GET();
    const body = await res?.json();

    expect(res?.status).toBe(200);
    // Confirma que veio o usuário da sessão, não outro
    expect(body.email).toBe('joao_public@test.com');
  });
});

// ---------------------------------------------------------------------------
// PATCH /api/portfolio/me — toggles de visibilidade
// ---------------------------------------------------------------------------
describe('PATCH /api/portfolio/me — toggles de visibilidade', () => {
  beforeEach(() => jest.clearAllMocks());

  it('retorna 401 quando não há sessão', async () => {
    mockUnauthenticated();

    const res = await PATCH(makeRequest({ showEmail: true }));

    expect(res?.status).toBe(401);
  });

  it('atualiza showEmail para true e persiste', async () => {
    mockAuthenticatedSession();

    const res = await PATCH(makeRequest({ showEmail: true }));
    const body = await res?.json();

    expect(res?.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.showEmail).toBe(true);
  });

  it('atualiza showEmail para false e persiste', async () => {
    mockAuthenticatedSession();

    const res = await PATCH(makeRequest({ showEmail: false }));
    const body = await res?.json();

    expect(res?.status).toBe(200);
    expect(body.data.showEmail).toBe(false);
  });

  it('atualiza múltiplos toggles em uma única requisição', async () => {
    mockAuthenticatedSession();

    const res = await PATCH(
      makeRequest({
        showEmail: false,
        showGithub: true,
        showLinkedin: false,
        showCertificates: true,
        showProjects: true,
        showFeedback: false,
        portfolioPublic: true,
      }),
    );
    const body = await res?.json();

    expect(res?.status).toBe(200);
    expect(body.data.showEmail).toBe(false);
    expect(body.data.showGithub).toBe(true);
    expect(body.data.showLinkedin).toBe(false);
    expect(body.data.showCertificates).toBe(true);
    expect(body.data.showProjects).toBe(true);
    expect(body.data.showFeedback).toBe(false);
    expect(body.data.portfolioPublic).toBe(true);
  });

  it('PATCH parcial — campos não enviados não são alterados', async () => {
    mockAuthenticatedSession();

    // Primeiro: define um estado conhecido
    await PATCH(makeRequest({ showEmail: true, showGithub: true }));

    // Segundo: altera só showEmail
    const res = await PATCH(makeRequest({ showEmail: false }));
    const body = await res?.json();

    expect(body.data.showEmail).toBe(false);
    // showGithub não foi enviado no segundo PATCH — não deve ter sido zerado
    expect(body.data.showGithub).toBe(true);
  });

  it('retorna 400 com body inválido', async () => {
    mockAuthenticatedSession();

    // showEmail deve ser boolean, não string
    const res = await PATCH(makeRequest({ showEmail: 'sim' }));

    expect(res?.status).toBe(400);
  });

  it('retorna 400 com avatar que não é URL válida', async () => {
    mockAuthenticatedSession();

    const res = await PATCH(makeRequest({ avatar: 'nao-e-uma-url' }));

    expect(res?.status).toBe(400);
  });

  it('a resposta segue a estrutura padrão { success, message, data, errors }', async () => {
    mockAuthenticatedSession();

    const res = await PATCH(makeRequest({ portfolioPublic: false }));
    const body = await res?.json();

    expect(body).toHaveProperty('success');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
  });

  it('depois do PATCH, o GET retorna os valores atualizados', async () => {
    mockAuthenticatedSession();

    // Salva um estado
    await PATCH(makeRequest({ showFeedback: false, portfolioPublic: true }));

    // Verifica que persiste
    const res = await GET();
    const body = await res?.json();

    expect(body.showFeedback).toBe(false);
    expect(body.portfolioPublic).toBe(true);
  });
});