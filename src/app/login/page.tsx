'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FormInput } from '@/components/ui/form-input';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      setError('E-mail ou senha inválidos');
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="E-mail"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Senha"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p>{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
