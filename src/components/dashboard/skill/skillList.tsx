'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash, Check, X } from 'lucide-react';

type Skill = {
  id: string;
  name: string;
  iconUrl?: string | null;
};

export function SkillList() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedIconUrl, setEditedIconUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skill');
      if (!res.ok) throw new Error('Erro ao carregar skills.');
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro ao carregar skills.'
      );
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Deseja realmente deletar esta skill?');
    if (!confirmed) return;

    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch(`/api/skill/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro ao deletar skill.');

      setSkills((prev) => prev.filter((skill) => skill.id !== id));
      setSuccessMessage(data.message || 'Skill deletada com sucesso.');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro ao deletar skill.'
      );
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setEditedName(skill.name);
    setEditedIconUrl(skill.iconUrl ?? '');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSaveEdit = async (id: string) => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch(`/api/skill/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editedName, iconUrl: editedIconUrl }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro ao atualizar skill.');

      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === id
            ? { ...skill, name: editedName, iconUrl: editedIconUrl }
            : skill
        )
      );
      setSuccessMessage('Skill atualizada com sucesso.');
      setEditingId(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro ao atualizar skill.'
      );
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Lista de Skills</h2>

      {successMessage && (
        <p className="text-sm font-medium text-green-500">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-sm font-medium text-red-500">{errorMessage}</p>
      )}

      {skills.map((skill) => (
        <Card
          key={skill.id}
          className="flex flex-col gap-3 p-4 shadow-sm md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-3">
            {/* Ícone da skill */}
            <img
              src={skill.iconUrl || 'https://via.placeholder.com/40?text=?'}
              alt={skill.name}
              className="h-10 w-10 rounded object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://via.placeholder.com/40?text=?';
              }}
            />

            {/* Se está editando, mostra campo editável */}
            {editingId === skill.id ? (
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Nome da skill"
                  className="w-48"
                />
                <Input
                  type="url"
                  value={editedIconUrl}
                  onChange={(e) => setEditedIconUrl(e.target.value)}
                  placeholder="URL do ícone"
                  className="w-64"
                />
              </div>
            ) : (
              <span className="truncate font-medium">{skill.name}</span>
            )}
          </div>

          {/* Ações */}
          <div className="mt-3 flex gap-2 md:mt-0">
            {editingId === skill.id ? (
              <>
                <Button
                  size="sm"
                  onClick={() => handleSaveEdit(skill.id)}
                  className="flex items-center gap-1"
                >
                  <Check size={14} /> Salvar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingId(null)}
                  className="flex items-center gap-1"
                >
                  <X size={14} /> Cancelar
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(skill)}
                  className="flex items-center gap-1"
                >
                  <Pencil size={14} /> Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(skill.id)}
                  className="flex items-center gap-1"
                >
                  <Trash size={14} /> Deletar
                </Button>
              </>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
