'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash, Check, X } from 'lucide-react';

type Stack = {
  id: string;
  name: string;
};

export default function ListStacks() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');

  const fetchStacks = async () => {
    try {
      const res = await fetch('/api/tech-stack');
      const data = await res.json();

      if (res.ok) {
        setStacks(data);
      } else {
        setErrorMessage(data.error || 'Erro ao carregar stacks.');
        console.error('Erro ao carregar stacks:', data.error);
      }
    } catch (error) {
      console.error('Erro na requisição ao buscar stacks:', error);
      setErrorMessage('Erro na requisição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/tech-stack/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok) {
        setStacks((prev) => prev.filter((stack) => stack.id !== id));
        console.log(`Stack "${data.name}" deletada com sucesso.`);
      } else {
        console.error('Erro ao deletar stack:', data.error);
      }
    } catch (error) {
      console.error('Erro ao deletar stack:', error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/tech-stack/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editedName }),
      });

      const data = await res.json();

      if (res.ok) {
        setStacks((prev) =>
          prev.map((stack) =>
            stack.id === id ? { ...stack, name: data.name } : stack
          )
        );
        setEditingId(null);
        setEditedName('');
        console.log(`Stack atualizada para "${data.name}"`);
      } else {
        console.error('Erro ao atualizar stack:', data.error);
      }
    } catch (error) {
      console.error('Erro ao atualizar stack:', error);
    }
  };

  useEffect(() => {
    fetchStacks();
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-md bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Stacks Cadastradas
      </h2>

      {loading ? (
        <p className="text-gray-600">Carregando...</p>
      ) : errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : stacks.length === 0 ? (
        <p className="text-gray-600">Nenhuma stack cadastrada ainda.</p>
      ) : (
        <ul className="space-y-2">
          {stacks.map((stack) => (
            <li
              key={stack.id}
              className="flex items-center justify-between rounded border px-4 py-2 hover:bg-gray-50"
            >
              {editingId === stack.id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full max-w-sm rounded border px-2 py-1"
                />
              ) : (
                <span>{stack.name}</span>
              )}

              <div className="flex gap-2">
                {editingId === stack.id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(stack.id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditedName('');
                      }}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(stack.id);
                        setEditedName(stack.name);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(stack.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={18} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
