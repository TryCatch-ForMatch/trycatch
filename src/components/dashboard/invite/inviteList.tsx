'use client';

import { useEffect, useState } from 'react';

type Invite = {
  id: string;
  email: string;
  code: string;
  used: boolean;
};

export default function InviteList() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedEmail, setEditedEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchInvites = async () => {
    const res = await fetch('/api/invite');
    const data = await res.json();
    setInvites(data);
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Deseja realmente deletar este convite?');
    if (!confirmed) return;

    const res = await fetch(`/api/invite/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setInvites((prev) => prev.filter((invite) => invite.id !== id));
    } else {
      const data = await res.json();
      setErrorMessage(data.error || 'Erro ao deletar convite.');
    }
  };

  const handleEdit = (invite: Invite) => {
    setEditingId(invite.id);
    setEditedEmail(invite.email);
  };

  const handleSaveEdit = async (id: string) => {
    const res = await fetch(`/api/invite/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: editedEmail }),
    });

    const data = await res.json();

    if (res.ok) {
      setInvites((prev) =>
        prev.map((invite) =>
          invite.id === id ? { ...invite, email: editedEmail } : invite
        )
      );
      setEditingId(null);
    } else {
      setErrorMessage(data.error || 'Erro ao atualizar convite.');
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <h2 className="mb-4 text-xl font-semibold">Lista de Convites</h2>

      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}

      <ul className="divide-y divide-gray-200">
        {invites.map((invite) => (
          <li
            key={invite.id}
            className="flex items-center justify-between py-3"
          >
            {editingId === invite.id ? (
              <div className="flex flex-col gap-2">
                {/* Campo editável apenas para o email */}
                <input
                  type="email"
                  className="w-2/3 rounded border p-1"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />

                {/* Campos apenas de leitura */}
                <p>
                  <strong>Código:</strong> {invite.code}
                </p>
                <p>
                  <strong>Usado:</strong> {invite.used ? 'Sim' : 'Não'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                <span>
                  <strong>Email:</strong> {invite.email}
                </span>
                <span>
                  <strong>Código:</strong> {invite.code}
                </span>
                <span>
                  <strong>Usado:</strong> {invite.used ? 'Sim' : 'Não'}
                </span>
              </div>
            )}

            <div className="space-x-2">
              {editingId === invite.id ? (
                <>
                  <button
                    onClick={() => handleSaveEdit(invite.id)}
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
                    onClick={() => handleEdit(invite)}
                    className="rounded bg-yellow-400 px-2 py-1 text-white"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(invite.id)}
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
