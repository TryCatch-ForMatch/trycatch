import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CertificatesCard } from '@/app/(private)/dashboard/portfolio/CertificatesCard';
import { useCertificates } from '@/app/(private)/dashboard/portfolio/hooks/useCertificates';

jest.mock('@/app/(private)/dashboard/portfolio/hooks/useCertificates', () => ({
  useCertificates: jest.fn(),
}));

// O calendário do DatePicker é testado à parte; aqui basta escolher uma data.
jest.mock('@/components/ui/date-picker', () => ({
  DatePicker: ({ onChange }: { onChange: (date: Date) => void }) => (
    <button type="button" onClick={() => onChange(new Date(2025, 0, 10))}>
      Escolher data
    </button>
  ),
}));

const mockedUseCertificates = useCertificates as jest.Mock;

const certificate = {
  id: 'c1',
  title: 'React Avançado',
  issuer: 'Alura',
  date: '01/2025',
  url: 'https://alura.com.br/certificado/c1',
  description: 'Hooks e performance',
};

function mockHook(overrides: Partial<ReturnType<typeof useCertificates>> = {}) {
  const value = {
    certificates: [],
    isLoading: false,
    isError: false,
    createCertificate: jest.fn().mockResolvedValue(true),
    deleteCertificate: jest.fn().mockResolvedValue(undefined),
    ...overrides,
  };
  mockedUseCertificates.mockReturnValue(value);
  return value;
}

describe('CertificatesCard', () => {
  it('não mostra lista nem aviso enquanto carrega', () => {
    mockHook({ isLoading: true });
    render(<CertificatesCard />);

    expect(
      screen.queryByText('Nenhum certificado cadastrado.')
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('mostra mensagem de erro quando a busca falha', () => {
    mockHook({ isError: true });
    render(<CertificatesCard />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Erro ao carregar certificados.'
    );
  });

  it('mostra aviso quando não há certificados', () => {
    mockHook();
    render(<CertificatesCard />);

    expect(
      screen.getByText('Nenhum certificado cadastrado.')
    ).toBeInTheDocument();
  });

  it('lista os certificados com link e descrição', () => {
    mockHook({ certificates: [certificate] });
    render(<CertificatesCard />);

    expect(screen.getByText('React Avançado')).toBeInTheDocument();
    expect(screen.getByText('Alura · 01/2025')).toBeInTheDocument();
    expect(screen.getByText('Hooks e performance')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Abrir certificado React Avançado' })
    ).toHaveAttribute('href', certificate.url);
  });

  it('remove o certificado depois da confirmação', async () => {
    const user = userEvent.setup();
    const { deleteCertificate } = mockHook({ certificates: [certificate] });
    render(<CertificatesCard />);

    await user.click(
      screen.getByRole('button', { name: 'Remover certificado React Avançado' })
    );
    await user.click(screen.getByRole('button', { name: 'Remover' }));

    expect(deleteCertificate).toHaveBeenCalledWith('c1');
  });

  it('não envia o formulário sem os campos obrigatórios', async () => {
    const user = userEvent.setup();
    const { createCertificate } = mockHook();
    render(<CertificatesCard />);

    await user.click(
      screen.getByRole('button', { name: 'Adicionar certificado' })
    );
    await user.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(await screen.findByText('Título obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Emissor obrigatório')).toBeInTheDocument();
    expect(createCertificate).not.toHaveBeenCalled();
  });

  it('cria o certificado e fecha a modal', async () => {
    const user = userEvent.setup();
    const { createCertificate } = mockHook();
    render(<CertificatesCard />);

    await user.click(
      screen.getByRole('button', { name: 'Adicionar certificado' })
    );
    await user.type(screen.getByLabelText('Título'), 'React Avançado');
    await user.type(screen.getByLabelText('Emissor'), 'Alura');
    await user.click(screen.getByRole('button', { name: 'Escolher data' }));
    await user.click(screen.getByRole('button', { name: 'Adicionar' }));

    await waitFor(() =>
      expect(createCertificate).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'React Avançado',
          issuer: 'Alura',
          date: new Date(2025, 0, 10),
        })
      )
    );
    await waitFor(() =>
      expect(screen.queryByText('Novo certificado')).not.toBeInTheDocument()
    );
  });
});
