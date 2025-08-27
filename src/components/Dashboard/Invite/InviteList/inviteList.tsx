'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash, Check, X } from 'lucide-react';

type Invite = {
  id: string;
  email: string;
  code: string;
  used: boolean;
};

export function InviteList() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedEmail, setEditedEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchInvites = async () => {
    try {
      const res = await fetch('/api/invite');
      if (!res.ok) throw new Error('Erro ao carregar convites.');
      const data = await res.json();
      setInvites(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro ao carregar convites.'
      );
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Deseja realmente deletar este convite?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/invite/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao deletar convite.');
      }
      setInvites((prev) => prev.filter((invite) => invite.id !== id));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro ao deletar convite.'
      );
    }
  };

  const handleEdit = (invite: Invite) => {
    setEditingId(invite.id);
    setEditedEmail(invite.email);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/invite/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: editedEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao atualizar convite.');
      }

      setInvites((prev) =>
        prev.map((invite) =>
          invite.id === id ? { ...invite, email: editedEmail } : invite
        )
      );
      setEditingId(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro ao atualizar convite.'
      );
    }
  };

  return (
    <Card className="mx-auto mt-6 max-w-4xl rounded-2xl shadow-md">
      <CardContent className="space-y-4 p-6">
        {/* Título */}
        <h2 className="text-xl font-semibold">Lista de Convites</h2>

        {/* Mensagem de erro */}
        {errorMessage && (
          <p className="text-sm font-medium text-red-500">{errorMessage}</p>
        )}

        {/* Lista de convites */}
        {invites.map((invite) => (
          <div
            key={invite.id}
            className="flex flex-col gap-3 p-4 shadow-sm md:flex-row md:items-center md:justify-between"
          >
            {/* Se está editando, mostra campo editável */}
            {editingId === invite.id ? (
              <div className="flex w-full flex-col gap-2">
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <Input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="mt-1 w-full md:w-64"
                  />
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Código:</strong> {invite.code}
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Usado:</strong> {invite.used ? 'Sim' : 'Não'}
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="truncate font-medium">{invite.email}</span>
                <span className="text-sm text-gray-600">
                  Código: {invite.code}
                </span>
                <span className="text-sm text-gray-600">
                  Usado: {invite.used ? 'Sim' : 'Não'}
                </span>
              </div>
            )}

            {/* Ações */}
            <div className="mt-3 flex gap-2 md:mt-0">
              {editingId === invite.id ? (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleSaveEdit(invite.id)}
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
                    onClick={() => handleEdit(invite)}
                    className="flex items-center gap-1"
                  >
                    <Pencil size={14} /> Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(invite.id)}
                    className="flex items-center gap-1"
                  >
                    <Trash size={14} /> Deletar
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
