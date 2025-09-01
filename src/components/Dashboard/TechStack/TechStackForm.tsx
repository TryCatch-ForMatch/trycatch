'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function TechStackForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/tech-stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.data.name, ':: STACK ::');
        toast.success(`Stack "${data.data.name}" cadastrada com sucesso!`);
        setName('');
      } else {
        toast.error(data.error || 'Erro ao cadastrar stack.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro na requisição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-4 max-w-md rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
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
