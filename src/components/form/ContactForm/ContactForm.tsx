'use client';

import { useState, useRef } from 'react';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
      await apiTryCatch.post('/contact', payload);

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
    <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-xl">
      <Input label="Nome" name="name" type="text" required />
      <Input label="E-mail" name="email" type="email" required />
      <Input label="Assunto" name="subject" type="text" required />

      <div className="mb-4 flex flex-col gap-1">
        <Label htmlFor="contact-message">Mensagem</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="resize-none"
        />
      </div>

      {success && (
        <p role="status" className="mb-4 text-sm text-green-600">
          Mensagem enviada com sucesso!
        </p>
      )}

      {error && (
        <p role="alert" className="mb-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" disabled={loading} size="lg">
        {loading ? 'Enviando...' : 'Enviar mensagem'}
      </Button>
    </form>
  );
}
