import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { HomeNavBar } from '@/components/layout/Home/HomeNavBar';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

const mockedUseSession = useSession as jest.Mock;

function renderWithStatus(
  status: 'loading' | 'authenticated' | 'unauthenticated'
) {
  mockedUseSession.mockReturnValue({ status, data: null });
  render(<HomeNavBar />);
}

describe('HomeNavBar', () => {
  it('mostra o botão Login para quem não está logado', () => {
    renderWithStatus('unauthenticated');

    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute(
      'href',
      '/login'
    );
    expect(
      screen.queryByRole('link', { name: 'Dashboard' })
    ).not.toBeInTheDocument();
  });

  it('mostra o botão Dashboard para quem está logado', () => {
    renderWithStatus('authenticated');

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'href',
      '/dashboard'
    );
    expect(
      screen.queryByRole('link', { name: 'Login' })
    ).not.toBeInTheDocument();
  });

  it('não mostra Login nem Dashboard enquanto a sessão carrega', () => {
    renderWithStatus('loading');

    expect(
      screen.queryByRole('link', { name: 'Login' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Dashboard' })
    ).not.toBeInTheDocument();
  });
});
