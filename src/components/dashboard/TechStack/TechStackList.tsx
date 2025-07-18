'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash, Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

type Stack = {
  id: string;
  name: string;
};

export function TechStackList() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');

  // Controle de modal para DELETE
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleteMode, setDeleteMode] = useState<'confirm' | 'blocked'>(
    'confirm'
  );
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  // Controle de modal para FORCE UPDATE
  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);
  const [pendingUpdateId, setPendingUpdateId] = useState<string | null>(null);

  const fetchStacks = async () => {
    try {
      const res = await fetch('/api/tech-stack');
      const data = await res.json();

      if (res.ok) {
        setStacks(data);
      } else {
        setErrorMessage(data.error || 'Erro ao carregar stacks.');
      }
    } catch (error) {
      console.error('Erro ao buscar stacks:', error);
      setErrorMessage('Erro na requisição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStacks();
  }, []);

  const handleDeleteClick = (id: string) => {
    setPendingDeleteId(id);
    setDeleteMode('confirm');
    setModalTitle('Confirmar exclusão');
    setModalDescription(
      'Tem certeza que deseja excluir esta stack? Esta ação não pode ser desfeita.'
    );
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      const res = await fetch(`/api/tech-stack/${pendingDeleteId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
        setStacks((prev) => prev.filter((s) => s.id !== pendingDeleteId));
        setConfirmDeleteOpen(false);
        setPendingDeleteId(null);
      } else if (res.status === 409) {
        // Backend informou que está vinculada → bloqueia exclusão
        setDeleteMode('blocked');
        setModalTitle('Exclusão bloqueada');
        setModalDescription(data.error);
      } else {
        console.error('Erro inesperado ao deletar:', data.error);
      }
    } catch (error) {
      console.error('Erro ao deletar stack:', error);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setPendingDeleteId(null);
  };

  const handleUpdate = async (id: string, forceUpdate = false) => {
    try {
      const res = await fetch(`/api/tech-stack/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editedName, forceUpdate }),
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
      } else if (
        res.status === 409 &&
        data.error?.includes('Alterações podem impactar')
      ) {
        setPendingUpdateId(id);
        setConfirmUpdateOpen(true);
      } else {
        console.error('Erro ao atualizar stack:', data.error);
      }
    } catch (error) {
      console.error('Erro ao atualizar stack:', error);
    }
  };

  const confirmForceUpdate = async () => {
    if (!pendingUpdateId) return;
    setConfirmUpdateOpen(false);
    await handleUpdate(pendingUpdateId, true);
    setPendingUpdateId(null);
  };

  const cancelForceUpdate = () => {
    setConfirmUpdateOpen(false);
    setPendingUpdateId(null);
  };

  return (
    <Card className="mx-auto mt-6 max-w-3xl rounded-2xl shadow-md">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-xl font-semibold text-gray-800">
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
                className="flex items-center justify-between rounded-md border p-3 hover:bg-gray-50"
              >
                {editingId === stack.id ? (
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="max-w-sm"
                  />
                ) : (
                  <span className="font-medium">{stack.name}</span>
                )}

                <div className="flex gap-2">
                  {editingId === stack.id ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdate(stack.id)}
                      >
                        <Check size={16} className="mr-1" /> Salvar
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setEditingId(null);
                          setEditedName('');
                        }}
                      >
                        <X size={16} className="mr-1" /> Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(stack.id);
                          setEditedName(stack.name);
                        }}
                      >
                        <Pencil size={16} className="mr-1" /> Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClick(stack.id)}
                      >
                        <Trash size={16} className="mr-1" /> Excluir
                      </Button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Modal de confirmação para deletar */}
        <ConfirmDialog
          open={confirmDeleteOpen}
          onConfirm={deleteMode === 'confirm' ? confirmDelete : cancelDelete}
          onCancel={cancelDelete}
          title={modalTitle}
          description={modalDescription}
        />

        {/* Modal de confirmação para atualização forçada */}
        <ConfirmDialog
          open={confirmUpdateOpen}
          onConfirm={confirmForceUpdate}
          onCancel={cancelForceUpdate}
          title="Stack vinculada a projetos"
          description="Esta stack está em uso. Alterações podem impactar projetos existentes. Deseja continuar?"
        />
      </CardContent>
    </Card>
  );
}
