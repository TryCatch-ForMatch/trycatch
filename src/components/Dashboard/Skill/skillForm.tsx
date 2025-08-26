'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/UI/card';
import { Label } from '@/components/UI/label';
import { Input } from '@/components/UI/input';
import { Button } from '@/components/UI/button';

export function SkillForm() {
  const [name, setName] = useState('');
  const [iconUrl, setIconUrl] = useState('');
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
        body: JSON.stringify({ name, iconUrl }),
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

          <div className="space-y-1">
            <Label htmlFor="skill-icon">Icone da Skill</Label>
            <Input
              id="skill-icon"
              type="url"
              value={iconUrl}
              onChange={(e) => setIconUrl(e.target.value)}
              placeholder="Ex: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
              required
            />
          </div>

          {/* Pré-visualização do ícone */}
          {iconUrl && (
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm text-gray-500">Pré-visualização:</p>
              <img
                src={iconUrl}
                alt="Prévia do ícone"
                className="h-12 w-12 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://via.placeholder.com/48?text=?';
                }}
              />
            </div>
          )}

          {/* Mensagens de sucesso/erro */}
          {successMessage && (
            <p className="text-sm font-medium text-green-500">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-sm font-medium text-red-500">{errorMessage}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Enviando...' : 'Cadastrar Skill'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
