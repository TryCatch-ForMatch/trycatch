'use client';

import { useState, useRef } from 'react';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      setSuccess(true);
      setError(null);
      formRef.current?.reset();
    } catch {
      setError('Não foi possível enviar sua mensagem. Tente novamente.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full max-w-xl space-y-4"
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Nome</label>
        <input
          name="name"
          type="text"
          required
          className="rounded-lg border px-4 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">E-mail</label>
        <input
          name="email"
          type="email"
          required
          className="rounded-lg border px-4 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Assunto</label>
        <input
          name="subject"
          type="text"
          required
          className="rounded-lg border px-4 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Mensagem</label>
        <textarea
          name="message"
          required
          rows={5}
          className="resize-none rounded-lg border px-4 py-2"
        />
      </div>

      {success && (
        <p className="text-sm text-green-600">Mensagem enviada com sucesso!</p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer rounded-lg bg-primary px-6 py-3 font-medium text-white disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Enviar mensagem'}
      </button>
    </form>
  );
}
