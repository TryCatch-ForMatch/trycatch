import { act, renderHook, waitFor } from '@testing-library/react';
import { AxiosError, AxiosHeaders } from 'axios';
import { toast } from 'sonner';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { usePortfolioSettings } from '@/app/(private)/dashboard/portfolio/hooks/usePortfolioSettings';
import { createQueryWrapper } from './query-wrapper';

jest.mock('@/lib/axios/axiosTryCatch', () => ({
  apiTryCatch: { get: jest.fn(), patch: jest.fn() },
}));

jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const mockedApi = apiTryCatch as unknown as {
  get: jest.Mock;
  patch: jest.Mock;
};

const apiPortfolio = {
  userName: 'maria',
  bio: 'Dev front-end',
  github: 'https://github.com/maria',
  linkedin: null,
  skills: [{ skill: { id: 's1' } }, { skill: { id: 's2' } }],
  portfolioPublic: true,
  showEmail: false,
  showGithub: true,
  showLinkedin: false,
  showProjects: true,
  showCertificates: false,
  showFeedback: false,
};

async function renderLoaded() {
  mockedApi.get.mockResolvedValue({ data: apiPortfolio });
  const { Wrapper } = createQueryWrapper();
  const { result } = renderHook(() => usePortfolioSettings(), {
    wrapper: Wrapper,
  });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  return { result };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('usePortfolioSettings', () => {
  it('preenche o formulário com os dados do portfólio', async () => {
    const { result } = await renderLoaded();

    expect(mockedApi.get).toHaveBeenCalledWith('/portfolio/me');
    expect(result.current.username).toBe('maria');
    expect(result.current.form.getValues()).toMatchObject({
      bio: 'Dev front-end',
      github: 'https://github.com/maria',
      linkedin: '',
      skills: ['s1', 's2'],
      portfolioPublic: true,
      showGithub: true,
    });
  });

  it('usa valores padrão quando o portfólio ainda não foi configurado', async () => {
    mockedApi.get.mockResolvedValue({ data: {} });
    const { Wrapper } = createQueryWrapper();
    const { result } = renderHook(() => usePortfolioSettings(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.username).toBeNull();
    expect(result.current.form.getValues()).toEqual({
      bio: '',
      github: '',
      linkedin: '',
      skills: [],
      portfolioPublic: false,
      showEmail: false,
      showGithub: false,
      showLinkedin: false,
      showProjects: false,
      showCertificates: false,
      showFeedback: false,
    });
  });

  it('salva as alterações e mostra o toast de sucesso', async () => {
    mockedApi.patch.mockResolvedValue({ data: {} });
    const { result } = await renderLoaded();
    const values = { ...result.current.form.getValues(), bio: 'Nova bio' };

    await act(() => result.current.onSubmit(values));

    expect(mockedApi.patch).toHaveBeenCalledWith('/portfolio/me', values);
    expect(toast.success).toHaveBeenCalledWith(
      'Alterações salvas com sucesso!'
    );
    expect(toast.error).not.toHaveBeenCalled();
    expect(result.current.form.getValues('bio')).toBe('Nova bio');
    expect(result.current.form.formState.isDirty).toBe(false);
  });

  it('mostra a mensagem da API no toast de erro quando o salvamento falha', async () => {
    mockedApi.patch.mockRejectedValue(
      new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, null, {
        data: { message: 'URL do GitHub inválida.' },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: { headers: new AxiosHeaders() },
      })
    );
    const { result } = await renderLoaded();

    await act(() => result.current.onSubmit(result.current.form.getValues()));

    expect(toast.error).toHaveBeenCalledWith('URL do GitHub inválida.');
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('usa a mensagem padrão no toast de erro quando a API não informa o motivo', async () => {
    mockedApi.patch.mockRejectedValue(new Error('Network Error'));
    const { result } = await renderLoaded();

    await act(() => result.current.onSubmit(result.current.form.getValues()));

    expect(toast.error).toHaveBeenCalledWith(
      'Erro ao salvar. Tente novamente.'
    );
  });
});
