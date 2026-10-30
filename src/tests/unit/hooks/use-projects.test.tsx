import { act, renderHook, waitFor } from '@testing-library/react';
import { AxiosError, AxiosHeaders } from 'axios';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import {
  projectKeys,
  useInvalidateProjects,
  useProjectDetails,
  useProjectsCount,
  useProjectsSummary,
} from '@/hooks/api/useProjects';
import { createQueryWrapper } from './query-wrapper';

jest.mock('@/lib/axios/axiosTryCatch', () => ({
  apiTryCatch: { get: jest.fn() },
}));

const mockedGet = apiTryCatch.get as jest.Mock;

function axiosErrorWithStatus(status: number) {
  return new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, null, {
    data: {},
    status,
    statusText: '',
    headers: {},
    config: { headers: new AxiosHeaders() },
  });
}

beforeEach(() => {
  mockedGet.mockReset();
});

describe('useProjectsSummary', () => {
  it('começa carregando e devolve a lista de projetos', async () => {
    const projects = [{ id: 'p1', name: 'Projeto 1' }];
    mockedGet.mockResolvedValue({ data: projects });
    const { Wrapper } = createQueryWrapper();

    const { result } = renderHook(() => useProjectsSummary(), {
      wrapper: Wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.projects).toEqual([]);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockedGet).toHaveBeenCalledWith('/team-project/summary');
    expect(result.current.projects).toEqual(projects);
    expect(result.current.isError).toBe(false);
  });

  it('sinaliza erro quando a busca falha', async () => {
    mockedGet.mockRejectedValue(axiosErrorWithStatus(500));
    const { Wrapper } = createQueryWrapper();

    const { result } = renderHook(() => useProjectsSummary(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.projects).toEqual([]);
  });
});

describe('useProjectsCount', () => {
  it('devolve as contagens por status', async () => {
    const counts = { concluido: 1, emAndamento: 2, buscando: 3 };
    mockedGet.mockResolvedValue({ data: { counts } });
    const { Wrapper } = createQueryWrapper();

    const { result } = renderHook(() => useProjectsCount(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockedGet).toHaveBeenCalledWith('/team-project/count');
    expect(result.current.counts).toEqual(counts);
  });
});

describe('useProjectDetails', () => {
  it('devolve os detalhes do projeto', async () => {
    const project = { id: 'p1', name: 'Projeto 1' };
    mockedGet.mockResolvedValue({ data: project });
    const { Wrapper } = createQueryWrapper();

    const { result } = renderHook(() => useProjectDetails('p1'), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockedGet).toHaveBeenCalledWith('/team-project/p1');
    expect(result.current.project).toEqual(project);
  });

  it.each([404, 400])(
    'trata o status %i como projeto não encontrado, sem erro',
    async (status) => {
      mockedGet.mockRejectedValue(axiosErrorWithStatus(status));
      const { Wrapper } = createQueryWrapper();

      const { result } = renderHook(() => useProjectDetails('p1'), {
        wrapper: Wrapper,
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.project).toBeNull();
      expect(result.current.isError).toBe(false);
    }
  );

  it('sinaliza erro de carregamento nas outras falhas', async () => {
    mockedGet.mockRejectedValue(axiosErrorWithStatus(500));
    const { Wrapper } = createQueryWrapper();

    const { result } = renderHook(() => useProjectDetails('p1'), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.project).toBeNull();
  });

  it('não busca quando o id está vazio', () => {
    const { Wrapper } = createQueryWrapper();

    renderHook(() => useProjectDetails(''), { wrapper: Wrapper });

    expect(mockedGet).not.toHaveBeenCalled();
  });
});

describe('useInvalidateProjects', () => {
  it('invalida todas as queries de projetos', async () => {
    const { queryClient, Wrapper } = createQueryWrapper();
    queryClient.setQueryData(projectKeys.summary(), []);
    queryClient.setQueryData(projectKeys.count(), { counts: {} });
    queryClient.setQueryData(projectKeys.detail('p1'), { id: 'p1' });
    queryClient.setQueryData(['outra-chave'], 'valor');

    const { result } = renderHook(() => useInvalidateProjects(), {
      wrapper: Wrapper,
    });

    await act(() => result.current());

    const isInvalidated = (key: readonly unknown[]) =>
      queryClient.getQueryState(key)?.isInvalidated;

    expect(isInvalidated(projectKeys.summary())).toBe(true);
    expect(isInvalidated(projectKeys.count())).toBe(true);
    expect(isInvalidated(projectKeys.detail('p1'))).toBe(true);
    expect(isInvalidated(['outra-chave'])).toBe(false);
  });
});
