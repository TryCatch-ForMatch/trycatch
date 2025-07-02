'use client';

import { useState } from 'react';

export default function InviteForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(`Convite criado com sucesso para ${data.email}`);
        setEmail('');
      } else {
        setErrorMessage(data.error || 'Erro ao criar convite.');
      }
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      setErrorMessage('Erro na requisição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md space-y-4 rounded-md bg-white p-6 shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Criar Convite</h2>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-mail do convidado
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:outline-none"
          placeholder="nome@email.com"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
      >
        {loading ? 'Enviando...' : 'Criar Convite'}
      </button>

      {successMessage && (
        <p className="mt-2 text-sm text-green-600">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </form>
  );
}
