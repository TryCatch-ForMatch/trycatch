/**
 * @jest-environment node
 */

import { MESSAGES } from '@/constants/messages';
import { AppError } from '@/lib/errors/app-error';
import { handleApiError } from '@/lib/errors/handle-api-error';
import { withErrorHandling } from '@/lib/errors/with-error-handling';
import { logger } from '@/lib/logger';

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('AppError', () => {
  it('deve armazenar mensagem, status e detalhes do erro', () => {
    const error = new AppError('Dados inválidos', 422, {
      name: 'Campo obrigatório',
    });

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('AppError');
    expect(error.message).toBe('Dados inválidos');
    expect(error.statusCode).toBe(422);
    expect(error.errors).toEqual({
      name: 'Campo obrigatório',
    });
  });
});

describe('handleApiError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar resposta padronizada para AppError', async () => {
    const response = handleApiError(
      new AppError('Recurso não encontrado', 404, {
        id: 'ID inválido',
      }),
      'GET /api/example'
    );
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({
      success: false,
      message: 'Recurso não encontrado',
      data: null,
      errors: {
        id: 'ID inválido',
      },
    });
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('deve retornar erro 500 padronizado para erros inesperados', async () => {
    const response = handleApiError(
      new Error('Database error'),
      'GET /api/example'
    );
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      success: false,
      message: MESSAGES.GENERAL.INTERNAL_ERROR,
      data: null,
      errors: null,
    });
    expect(logger.error).toHaveBeenCalledWith(
      'Erro inesperado na API:',
      'GET /api/example',
      {
        error: 'Database error',
      }
    );
  });
});

describe('withErrorHandling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar a resposta original quando o handler executar com sucesso', async () => {
    const handler = jest.fn(async (id: string) =>
      Response.json({ id }, { status: 200 })
    );

    const wrappedHandler = withErrorHandling(handler, 'GET /api/example');
    const response = await wrappedHandler('user-1');
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ id: 'user-1' });
    expect(handler).toHaveBeenCalledWith('user-1');
  });

  it('deve capturar exceções do handler e retornar resposta padronizada', async () => {
    const handler = jest.fn(async () => {
      throw new AppError('Acesso negado', 403);
    });

    const wrappedHandler = withErrorHandling(handler, 'GET /api/example');
    const response = await wrappedHandler();
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body).toEqual({
      success: false,
      message: 'Acesso negado',
      data: null,
      errors: null,
    });
  });
});
