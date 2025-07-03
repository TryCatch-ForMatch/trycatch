'use client';

import { useState } from 'react';

export default function SkillForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(`Skill "${data.name}" cadastrada com sucesso!`);
        setName('');
      } else {
        setErrorMessage(data.error || 'Erro ao cadastrar skill.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro na requisição.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md space-y-4 rounded-md bg-white p-6 shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Cadastrar Skill</h2>

      <div>
        <label
          htmlFor="skill"
          className="block text-sm font-medium text-gray-700"
        >
          Nome da Skill
        </label>
        <input
          id="skill"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: React, Tailwind, Node.js..."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
      >
        {loading ? 'Enviando...' : 'Cadastrar Skill'}
      </button>

      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </form>
  );
}
