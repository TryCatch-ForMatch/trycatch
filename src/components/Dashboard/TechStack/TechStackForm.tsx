'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';

export function TechStackForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await apiTryCatch.post('/tech-stack', { name });

      toast.success(`Stack "${data.data.name}" cadastrada com sucesso!`);
      setName('');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao cadastrar stack.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-4 max-w-md rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Cadastrar Stack
          </h2>

          <div className="space-y-1">
            <Label htmlFor="stack">Nome da Stack</Label>
            <Input
              id="stack"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: React, Node.js, PostgreSQL..."
            />
          </div>

          <Button type="submit" disabled={loading || !name} className="w-full">
            {loading ? 'Salvando...' : 'Cadastrar Stack'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
