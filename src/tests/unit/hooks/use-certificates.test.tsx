import { act, renderHook, waitFor } from '@testing-library/react';
import { AxiosError, AxiosHeaders } from 'axios';
import { toast } from 'sonner';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { useCertificates } from '@/app/(private)/dashboard/portfolio/hooks/useCertificates';
import { createQueryWrapper } from './query-wrapper';

jest.mock('@/lib/axios/axiosTryCatch', () => ({
  apiTryCatch: { get: jest.fn(), post: jest.fn(), delete: jest.fn() },
}));

jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const mockedApi = apiTryCatch as unknown as {
  get: jest.Mock;
  post: jest.Mock;
  delete: jest.Mock;
};

const existing = {
  id: 'c1',
  title: 'React',
  issuer: 'Alura',
  date: '01/2025',
  url: null,
  description: null,
};

function axiosErrorWithMessage(message: string) {
  return new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, null, {
    data: { message },
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: { headers: new AxiosHeaders() },
  });
}

async function renderLoaded() {
  mockedApi.get.mockResolvedValue({ data: [existing] });
  const { Wrapper } = createQueryWrapper();
  const { result } = renderHook(() => useCertificates(), { wrapper: Wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  return { result };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useCertificates', () => {
  it('carrega os certificados do usuário', async () => {
    const { result } = await renderLoaded();

    expect(mockedApi.get).toHaveBeenCalledWith('/user-certificate');
    expect(result.current.certificates).toEqual([existing]);
    expect(result.current.isError).toBe(false);
  });

  it('sinaliza erro quando a lista não carrega', async () => {
    mockedApi.get.mockRejectedValue(axiosErrorWithMessage('Falhou'));
    const { Wrapper } = createQueryWrapper();

    const { result } = renderHook(() => useCertificates(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.certificates).toEqual([]);
  });

  it('cria o certificado, envia a data como MM/AAAA e coloca no início da lista', async () => {
    const created = { ...existing, id: 'c2', title: 'Next.js' };
    mockedApi.post.mockResolvedValue({ data: { data: created } });
    const { result } = await renderLoaded();

    let success = false;
    await act(async () => {
      success = await result.current.createCertificate({
        title: 'Next.js',
        issuer: 'Alura',
        date: new Date(2025, 2, 15),
        url: '',
        description: '',
      });
    });

    expect(success).toBe(true);
    expect(mockedApi.post).toHaveBeenCalledWith('/user-certificate', {
      title: 'Next.js',
      issuer: 'Alura',
      date: '03/2025',
      url: undefined,
      description: undefined,
    });
    await waitFor(() =>
      expect(result.current.certificates).toEqual([created, existing])
    );
    expect(toast.success).toHaveBeenCalledWith('Certificado adicionado!');
  });

  it('mostra a mensagem da API e devolve false quando a criação falha', async () => {
    mockedApi.post.mockRejectedValue(axiosErrorWithMessage('Dados inválidos'));
    const { result } = await renderLoaded();

    let success = true;
    await act(async () => {
      success = await result.current.createCertificate({
        title: 'Next.js',
        issuer: 'Alura',
        date: new Date(2025, 2, 15),
      });
    });

    expect(success).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Dados inválidos');
    expect(result.current.certificates).toEqual([existing]);
  });

  it('remove o certificado da lista', async () => {
    mockedApi.delete.mockResolvedValue({ data: {} });
    const { result } = await renderLoaded();

    await act(() => result.current.deleteCertificate('c1'));

    expect(mockedApi.delete).toHaveBeenCalledWith('/user-certificate/c1');
    await waitFor(() => expect(result.current.certificates).toEqual([]));
    expect(toast.success).toHaveBeenCalledWith('Certificado removido!');
  });

  it('mantém a lista e mostra erro quando a remoção falha', async () => {
    mockedApi.delete.mockRejectedValue(axiosErrorWithMessage('Sem permissão'));
    const { result } = await renderLoaded();

    await act(() => result.current.deleteCertificate('c1'));

    expect(toast.error).toHaveBeenCalledWith('Sem permissão');
    expect(result.current.certificates).toEqual([existing]);
  });
});
