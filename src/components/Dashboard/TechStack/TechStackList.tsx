'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash, Check, X } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { toast } from 'sonner';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import {
  getApiErrorMessage,
  getApiErrorStatus,
} from '@/lib/axios/get-api-error-message';

type Stack = {
  id: string;
  name: string;
};

export function TechStackList() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleteMode, setDeleteMode] = useState<'confirm' | 'blocked'>(
    'confirm'
  );
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);
  const [pendingUpdateId, setPendingUpdateId] = useState<string | null>(null);

  const fetchStacks = async () => {
    try {
      const { data } = await apiTryCatch.get('/tech-stack');
      setStacks(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao carregar stacks.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchStacks();
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
      await apiTryCatch.delete(`/tech-stack/${pendingDeleteId}`);

      setStacks((prev) => prev.filter((s) => s.id !== pendingDeleteId));
      setConfirmDeleteOpen(false);
      setPendingDeleteId(null);
      toast.success('Stack excluída com sucesso!');
    } catch (error) {
      const message = getApiErrorMessage(error, 'Erro inesperado ao deletar.');

      if (getApiErrorStatus(error) === 409) {
        setDeleteMode('blocked');
        setModalTitle('Exclusão bloqueada');
        setModalDescription(message);
      } else {
        toast.error(message);
      }
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setPendingDeleteId(null);
  };

  const handleUpdate = async (id: string, forceUpdate = false) => {
    try {
      const { data } = await apiTryCatch.patch(`/tech-stack/${id}`, {
        name: editedName,
        forceUpdate,
      });

      setStacks((prev) =>
        prev.map((stack) =>
          stack.id === id ? { ...stack, name: data.name } : stack
        )
      );
      setEditingId(null);
      setEditedName('');
      toast.success('Stack atualizada com sucesso!');
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        'Erro inesperado ao atualizar.'
      );

      if (
        getApiErrorStatus(error) === 409 &&
        message.includes('Alterações podem impactar')
      ) {
        setPendingUpdateId(id);
        setConfirmUpdateOpen(true);
      } else {
        toast.error(message);
      }
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
    <CardContent className="mx-auto mt-6 max-w-3xl rounded-2xl shadow-md">
      <div className="space-y-4 p-6">
        <h2 className="text-xl font-semibold text-foreground">
          Stacks Cadastradas
        </h2>

        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : stacks.length === 0 ? (
          <p className="text-muted-foreground">
            Nenhuma stack cadastrada ainda.
          </p>
        ) : (
          <ul className="space-y-2">
            {stacks.map((stack) => (
              <li
                key={stack.id}
                className="flex items-center justify-between rounded-md border p-3 hover:bg-accent"
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

        <ConfirmDialog
          open={confirmDeleteOpen}
          onConfirm={deleteMode === 'confirm' ? confirmDelete : cancelDelete}
          onCancel={cancelDelete}
          title={modalTitle}
          description={modalDescription}
        />

        <ConfirmDialog
          open={confirmUpdateOpen}
          onConfirm={confirmForceUpdate}
          onCancel={cancelForceUpdate}
          title="Stack vinculada a projetos"
          description="Esta stack está em uso. Alterações podem impactar projetos existentes. Deseja continuar?"
        />
      </div>
    </CardContent>
  );
}
