'use client';

import { useEffect, useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash, Check, X } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { toast } from 'sonner';

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

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skill');
      const data = await res.json();

      if (res.ok) {
        setSkills(data);
      } else {
        toast.error(data.error || 'Erro ao carregar skills.');
      }
    } catch (error) {
      console.error('Erro ao buscar skills:', error);
      toast.error('Erro na requisição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Abrir modal de confirmação de exclusão
  const handleDeleteClick = (id: string) => {
    setPendingDeleteId(id);
    setDeleteMode('confirm');
    setModalTitle('Confirmar exclusão');
    setModalDescription(
      'Tem certeza que deseja excluir esta skill? Esta ação não pode ser desfeita.'
    );
    setConfirmDeleteOpen(true);
  };

  // Confirmar exclusão
  const confirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      const res = await fetch(`/api/skill/${pendingDeleteId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
        setSkills((prev) => prev.filter((s) => s.id !== pendingDeleteId));
        setConfirmDeleteOpen(false);
        setPendingDeleteId(null);
        toast.success('Skill excluída com sucesso!');
      } else if (res.status === 409) {
        // Vinculada → bloqueia exclusão
        setDeleteMode('blocked');
        setModalTitle('Exclusão bloqueada');
        setModalDescription(data.error);
      } else {
        console.error('Erro inesperado ao deletar skill:', data.error);
        toast.error(data.error || 'Erro inesperado ao deletar.');
      }
    } catch (error) {
      console.error('Erro ao deletar skill:', error);
      toast.error('Erro na requisição ao deletar skill.');
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setPendingDeleteId(null);
  };

  // Abrir edição
  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setEditedName(skill.name);
    setEditedIconUrl(skill.iconUrl ?? '');
  };

  // PATCH da atualização
  const handleUpdate = async (id: string, forceUpdate = false) => {
    try {
      const res = await fetch(`/api/skill/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editedName,
          iconUrl: editedIconUrl,
          forceUpdate,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Atualiza localmente
        setSkills((prev) =>
          prev.map((skill) =>
            skill.id === id
              ? { ...skill, name: editedName, iconUrl: editedIconUrl }
              : skill
          )
        );
        setEditingId(null);
        toast.success('Skill atualizada com sucesso!');
      } else if (
        res.status === 409 &&
        (data.error?.includes('Alterações podem impactar') ||
          data.message?.includes('Alterações podem impactar'))
      ) {
        // Backend informou que está vinculada → abrir modal de confirmação
        setPendingUpdateId(id);
        setConfirmUpdateOpen(true);
      } else {
        console.error('Erro ao atualizar skill:', data.error || data.message);
        toast.error(
          data.error || data.message || 'Erro inesperado ao atualizar.'
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar skill:', error);
      toast.error('Erro na requisição ao atualizar skill.');
    }
  };

  // Confirma forçar update
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

        {/* Feedback visual */}
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
                {/* Ícone + nome ou inputs */}
                <div className="skill-icon flex items-center gap-3">
                  <img
                    src={
                      skill.iconUrl || 'https://via.placeholder.com/40?text=?'
                    }
                    alt={skill.name}
                    className="h-10 w-10 rounded object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://via.placeholder.com/40?text=?';
                    }}
                  />

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

                {/* Botões de ação */}
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
          title="Skill vinculada a projetos/usuários"
          description="Esta skill está em uso. Alterações podem impactar projetos e usuários existentes. Deseja continuar?"
        />
      </div>
    </CardContent>
  );
}
