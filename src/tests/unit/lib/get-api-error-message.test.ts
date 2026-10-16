import { AxiosError, AxiosHeaders } from 'axios';
import {
  getApiErrorMessage,
  getApiErrorStatus,
} from '@/lib/axios/get-api-error-message';

function axiosErrorWith(data: unknown) {
  return new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, null, {
    data,
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: { headers: new AxiosHeaders() },
  });
}

describe('getApiErrorMessage', () => {
  it('usa o campo message da resposta', () => {
    const error = axiosErrorWith({
      success: false,
      message: 'Convite inválido.',
    });

    expect(getApiErrorMessage(error, 'fallback')).toBe('Convite inválido.');
  });

  it('usa o campo error quando não há message', () => {
    const error = axiosErrorWith({ error: 'Dados inválidos' });

    expect(getApiErrorMessage(error, 'fallback')).toBe('Dados inválidos');
  });

  it('usa o fallback quando a resposta não traz mensagem', () => {
    expect(getApiErrorMessage(axiosErrorWith({}), 'fallback')).toBe('fallback');
  });

  it('usa o fallback quando não houve resposta', () => {
    const error = new AxiosError('Network Error', 'ERR_NETWORK');

    expect(getApiErrorMessage(error, 'fallback')).toBe('fallback');
  });

  it('usa o fallback para erros que não são do axios', () => {
    expect(getApiErrorMessage(new Error('boom'), 'fallback')).toBe('fallback');
  });
});

describe('getApiErrorStatus', () => {
  it('retorna o status da resposta', () => {
    expect(getApiErrorStatus(axiosErrorWith({}))).toBe(400);
  });

  it('retorna undefined quando não houve resposta', () => {
    expect(
      getApiErrorStatus(new AxiosError('Network Error', 'ERR_NETWORK'))
    ).toBeUndefined();
  });

  it('retorna undefined para erros que não são do axios', () => {
    expect(getApiErrorStatus(new Error('boom'))).toBeUndefined();
  });
});
