'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function InviteForm() {
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
        setSuccessMessage(`Código de convite gerado: ${data.code}`);
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
    <Card className="mx-auto mt-4 max-w-md rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Criar Convite</h2>

          <div className="space-y-1">
            <Label htmlFor="email">E-mail do convidado</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@email.com"
            />
          </div>

          {/* Mensagens de erro/sucesso */}
          {successMessage && (
            <p className="text-sm font-medium text-green-500">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-sm font-medium text-red-500">{errorMessage}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Enviando...' : 'Criar Convite'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
