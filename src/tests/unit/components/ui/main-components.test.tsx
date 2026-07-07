import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import GoBackButton from '@/components/ui/go-back-button';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { FormInput } from '@/components/ui/form-input';

const mockBack = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe('main reusable UI components', () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it('renders the button with default semantics and handles clicks', () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Salvar</Button>);

    const button = screen.getByRole('button', { name: 'Salvar' });

    expect(button).toHaveAttribute('data-slot', 'button');
    expect(button).toHaveClass('bg-[#3B38A0]');

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders the button as a child element when requested', () => {
    render(
      <Button asChild>
        <a href="/portfolios">Portfólios</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Portfólios' });

    expect(link).toHaveAttribute('href', '/portfolios');
    expect(link).toHaveAttribute('data-slot', 'button');
  });

  it('connects form input labels, values and validation messages', () => {
    render(
      <FormInput
        label="Nome"
        name="name"
        placeholder="Digite seu nome"
        defaultValue="Maria"
        error="Nome é obrigatório"
      />
    );

    const input = screen.getByLabelText('Nome');

    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAttribute('placeholder', 'Digite seu nome');
    expect(input).toHaveValue('Maria');
    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
  });

  it('renders a form field label with children and optional error text', () => {
    render(
      <FormField label="Bio" error="Bio muito curta">
        <textarea aria-label="Bio do usuário" />
      </FormField>
    );

    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByLabelText('Bio do usuário')).toBeInTheDocument();
    expect(screen.getByText('Bio muito curta')).toBeInTheDocument();
  });

  it('navigates back when the back button is clicked', () => {
    render(<GoBackButton />);

    fireEvent.click(screen.getByRole('button', { name: 'Voltar' }));

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
