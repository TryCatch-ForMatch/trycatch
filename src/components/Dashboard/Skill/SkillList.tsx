'use client';

import { useEffect, useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash, Check, X } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { toast } from 'sonner';
import Image from 'next/image';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import {
  getApiErrorMessage,
  getApiErrorStatus,
} from '@/lib/axios/get-api-error-message';

type Skill = {
  id: string;
  name: string;
  iconUrl?: string | null;
};

export function SkillList() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedIconUrl, setEditedIconUrl] = useState('');

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleteMode, setDeleteMode] = useState<'confirm' | 'blocked'>(
    'confirm'
  );
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);
  const [pendingUpdateId, setPendingUpdateId] = useState<string | null>(null);

  const fetchSkills = async () => {
    try {
      const { data } = await apiTryCatch.get('/skill');
      setSkills(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao carregar skills.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDeleteClick = (id: string) => {
    setPendingDeleteId(id);
    setDeleteMode('confirm');
    setModalTitle('Confirmar exclusão');
    setModalDescription(
      'Tem certeza que deseja excluir esta skill? Esta ação não pode ser desfeita.'
    );
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      await apiTryCatch.delete(`/skill/${pendingDeleteId}`);

      setSkills((prev) => prev.filter((s) => s.id !== pendingDeleteId));
      setConfirmDeleteOpen(false);
      setPendingDeleteId(null);
      toast.success('Skill excluída com sucesso!');
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

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setEditedName(skill.name);
    setEditedIconUrl(skill.iconUrl ?? '');
  };

  const handleUpdate = async (id: string, forceUpdate = false) => {
    try {
      await apiTryCatch.patch(`/skill/${id}`, {
        name: editedName,
        iconUrl: editedIconUrl,
        forceUpdate,
      });

      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === id
            ? {
                ...skill,
                name: editedName,
                iconUrl: editedIconUrl || null,
              }
            : skill
        )
      );
      setEditingId(null);
      toast.success('Skill atualizada com sucesso!');
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
    <CardContent className="mx-auto mt-6 max-w-4xl rounded-2xl shadow-md">
      <div className="space-y-4 p-6">
        <h2 className="text-xl font-semibold text-gray-800">Lista de Skills</h2>

        {loading ? (
          <p className="text-gray-600">Carregando...</p>
        ) : skills.length === 0 ? (
          <p className="text-gray-600">Nenhuma skill cadastrada ainda.</p>
        ) : (
          <ul className="space-y-2">
            {skills.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center justify-between rounded-md border p-3 hover:bg-gray-50"
              >
                <div className="skill-icon flex items-center gap-3">
                  {skill.iconUrl && (
                    <Image
                      src={skill.iconUrl}
                      alt={skill.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded object-contain"
                    />
                  )}

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

                <div className="flex gap-2">
                  {editingId === skill.id ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdate(skill.id)}
                      >
                        <Check size={16} className="mr-1" /> Salvar
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setEditingId(null)}
                      >
                        <X size={16} className="mr-1" /> Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(skill)}
                      >
                        <Pencil size={16} className="mr-1" /> Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClick(skill.id)}
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
          title="Skill vinculada a projetos/usuários"
          description="Esta skill está em uso. Alterações podem impactar projetos e usuários existentes. Deseja continuar?"
        />
      </div>
    </CardContent>
  );
}
