'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { InputField } from '@/components/ui/input-field';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';

export function SkillForm() {
  const [name, setName] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    setPreviewError(false);

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
      const { data } = await apiTryCatch.post('/skill', { name });

      toast.success(`Skill "${data.data.name}" cadastrada com sucesso!`);
      setName('');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao cadastrar skill.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-4 max-w-md rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Cadastrar Skill
          </h2>

          <div className="space-y-1">
            <Label htmlFor="skill">Nome da Skill</Label>
            <InputField
              id="skill"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: React, Tailwind, Node.js..."
              required
            />
          </div>

          {(iconUrl || name) && (
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm text-muted-foreground">Pré-visualização:</p>

              {iconUrl && !previewError ? (
                <Image
                  src={iconUrl}
                  alt={`Ícone da skill ${name}`}
                  width={48}
                  height={48}
                  className="skill-icon object-contain"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <span className="text-sm font-medium text-muted-foreground">
                  {name}
                </span>
              )}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Enviando...' : 'Cadastrar Skill'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
