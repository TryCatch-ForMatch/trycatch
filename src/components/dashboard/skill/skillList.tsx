'use client';

import { useEffect, useState } from 'react';

type Skill = {
  id: string;
  name: string;
};

export default function SkillList() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchSkills = async () => {
    const res = await fetch('/api/skill');
    const data = await res.json();
    setSkills(data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Deseja realmente deletar esta skill?');
    if (!confirmed) return;

    setErrorMessage('');
    setSuccessMessage('');

    const res = await fetch(`/api/skill/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (res.ok) {
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
      setSuccessMessage(data.message || 'Skill deletada com sucesso.');
    } else {
      setErrorMessage(data.error || 'Erro ao deletar skill.');
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setEditedName(skill.name);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSaveEdit = async (id: string) => {
    setErrorMessage('');
    setSuccessMessage('');

    const res = await fetch(`/api/skill/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editedName }),
    });

    const data = await res.json();

    if (res.ok) {
      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === id ? { ...skill, name: editedName } : skill
        )
      );
      setSuccessMessage('Skill atualizada com sucesso.');
      setEditingId(null);
    } else {
      setErrorMessage(data.error || 'Erro ao atualizar skill.');
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <h2 className="mb-4 text-xl font-semibold">Lista de Skills</h2>

      {successMessage && (
        <p className="mb-4 text-green-600">{successMessage}</p>
      )}
      {errorMessage && <p className="mb-4 text-red-600">{errorMessage}</p>}

      <ul className="divide-y divide-gray-200">
        {skills.map((skill) => (
          <li key={skill.id} className="flex items-center justify-between py-3">
            {editingId === skill.id ? (
              <input
                type="text"
                className="w-2/3 rounded border p-1"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              <span>{skill.name}</span>
            )}

            <div className="space-x-2">
              {editingId === skill.id ? (
                <>
                  <button
                    onClick={() => handleSaveEdit(skill.id)}
                    className="rounded bg-green-500 px-2 py-1 text-white"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded bg-gray-300 px-2 py-1"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(skill)}
                    className="rounded bg-yellow-400 px-2 py-1 text-white"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="rounded bg-red-500 px-2 py-1 text-white"
                  >
                    Deletar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
