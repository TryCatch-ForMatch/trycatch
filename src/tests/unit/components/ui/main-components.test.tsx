import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import GoBackButton from '@/components/ui/go-back-button';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { InputField } from '@/components/ui/input-field';

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
    expect(button).toHaveClass('bg-primary');

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

  it('connects input label, value and validation message without an explicit id', () => {
    render(
      <InputField
        label="Nome"
        name="name"
        placeholder="Digite seu nome"
        defaultValue="Maria"
        error="Nome é obrigatório"
      />
    );

    const input = screen.getByLabelText('Nome');
    const message = screen.getByText('Nome é obrigatório');

    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAttribute('placeholder', 'Digite seu nome');
    expect(input).toHaveValue('Maria');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', message.id);
  });

  it('keeps the id passed to the input', () => {
    render(<InputField id="email" label="Email" />);

    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email');
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
