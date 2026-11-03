import { render, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { ProjectStackSelector } from '@/components/Dashboard/TeamProject/ProjectStackSelector';
import { toast } from 'sonner';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';

jest.mock('sonner', () => ({
  toast: { error: jest.fn(), success: jest.fn() },
}));
jest.mock('@/lib/axios/axiosTryCatch', () => ({
  apiTryCatch: { get: jest.fn() },
}));

function Harness() {
  const methods = useForm({ defaultValues: { stacks: [] } });
  return (
    <FormProvider {...methods}>
      <ProjectStackSelector />
    </FormProvider>
  );
}

describe('ProjectStackSelector', () => {
  beforeEach(() => {
    (toast.error as jest.Mock).mockClear();
  });

  it('mostra a mensagem da API quando o carregamento falha', async () => {
    (apiTryCatch.get as jest.Mock).mockRejectedValue({
      isAxiosError: true,
      response: { data: { message: 'Projeto não pode mais ser editado' } },
    });

    render(<Harness />);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        'Projeto não pode mais ser editado'
      )
    );
  });

  it('usa a mensagem atual como fallback quando o erro não traz uma', async () => {
    (apiTryCatch.get as jest.Mock).mockRejectedValue(new Error('boom'));

    render(<Harness />);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Erro ao carregar stacks.')
    );
  });
});
