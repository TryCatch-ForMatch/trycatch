'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput } from '@/components/ui/form-input';

export default function InviteRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', inviteCode: '' });
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push(`/signup?email=${encodeURIComponent(form.email)}`);
    } else {
      const data = await res.json();
      setError(data.error || 'Código inválido');
    }
  }

  return (
    <div>
      <h2>Registro por convite</h2>
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
          label="Código de convite"
          name="inviteCode"
          type="text"
          value={form.inviteCode}
          onChange={handleChange}
          required
        />

        {error && <p>{error}</p>}

        <button type="submit">Continuar</button>
      </form>
    </div>
  );
}
