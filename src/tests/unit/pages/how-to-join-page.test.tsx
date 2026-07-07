import { render, screen } from '@testing-library/react';

import HowToJoinPage from '@/app/(public)/how-to-join/page';

describe('HowToJoinPage', () => {
  it('deve destacar o fluxo de solicitação de convite', () => {
    render(<HowToJoinPage />);

    expect(
      screen.getByRole('heading', {
        name: 'Como participar do TryCatch',
        level: 1,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /Solicitar convite/i })
    ).toHaveAttribute('href', '/invite-request');
  });

  it('deve renderizar perfis derivados dos caminhos de participação', () => {
    render(<HowToJoinPage />);

    for (const profile of [
      'Contribuir com a plataforma',
      'Cadastrar um projeto',
      'Participar como membro',
      'Participar como mentor',
    ]) {
      expect(screen.getAllByText(profile).length).toBeGreaterThanOrEqual(2);
    }

    expect(
      screen.getByRole('link', { name: /Quero participar de uma equipe/i })
    ).toHaveAttribute('href', '/invite-request?role=USER');
  });
});
