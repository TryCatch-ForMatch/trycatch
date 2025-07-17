'use client';

import { useState } from 'react';

export default function FormStack() {
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/tech-stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(`Stack "${data.name}" cadastrada com sucesso!`);
        setName('');
      } else {
        setErrorMessage(data.error || 'Erro ao cadastrar stack.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
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
      <h2 className="text-2xl font-semibold text-gray-800">Cadastrar Stack</h2>

      <div>
        <label
          htmlFor="stack"
          className="block text-sm font-medium text-gray-700"
        >
          Selecione uma Stack
        </label>
        <input
          type="text"
          id="stack"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome da Stack"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:outline-none"
        ></input>
      </div>

      <button
        type="submit"
        disabled={loading || !name}
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
      >
        {loading ? 'Salvando...' : 'Cadastrar Stack'}
      </button>

      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </form>
  );
}
