'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';

export function SkillForm() {
  const [name, setName] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Atualiza o ícone automaticamente conforme o nome digitado
  useEffect(() => {
    if (!name.trim()) {
      setIconUrl('');
      return;
    }

    const normalized = name.trim().toLowerCase();
    const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${normalized}/${normalized}-original.svg`;
    setIconUrl(url);
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Skill "${data.data.name}" cadastrada com sucesso!`);
        setName('');
      } else {
        toast.error(data.error || 'Erro ao cadastrar skill.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro na requisição.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-4 max-w-md rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Cadastrar Skill
          </h2>

          <div className="space-y-1">
            <Label htmlFor="skill">Nome da Skill</Label>
            <Input
              id="skill"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: React, Tailwind, Node.js..."
              required
            />
          </div>

          {/* Pré-visualização do ícone */}
          {iconUrl && (
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm text-gray-500">Pré-visualização:</p>
              <Image
                src={iconUrl}
                alt={`Ícone da skill ${name}`}
                className="skill-icon h-12 w-12 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://via.placeholder.com/48?text=?';
                }}
              />
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Enviando...' : 'Cadastrar Skill'}
          </Button>
        </form>
      </C