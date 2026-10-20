'use client';

import { useState, useEffect } from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { BasicUser, FullUser } from '@/types/interface/user';
import { EditUserAdminForm } from './EditUserAdminForm';
import Modal from '@/components/ui/modal';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { toast } from 'sonner';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';

export function UserAdminList() {
  const [users, setUsers] = useState<BasicUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FullUser | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const { data } = await apiTryCatch.get<BasicUser[]>('/user-admin');
      setUsers(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao buscar usuários'));
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  const confirmDelete = async () => {
    const userId = pendingDeleteId;
    if (!userId) return;
    setPendingDeleteId(null);

    try {
      await apiTryCatch.delete(`/user-admin/${userId}`);

      setUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success('Usuário excluído com sucesso!');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao excluir usuário.'));
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
    void fetchUsers();
  };

  const handleEdit = async (userId: string) => {
    try {
      const { data } = await apiTryCatch.get<FullUser>(`/user-admin/${userId}`);
      setSelectedUser(data);
      setIsDialogOpen(true);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao carregar usuário'));
    }
  };

  return (
    <CardContent className="mx-auto mt-6 max-w-4xl rounded-2xl shadow-md">
      <div className="space-y-4 p-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 shadow-sm"
          >
            <div className="items-left flex flex-col gap-1">
              <p className="w-100 truncate font-semibold">{user.name}</p>
              <p className="w-40 truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(user.id)}
              >
                <Pencil aria-hidden size={12} className="mr-1" /> Editar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setPendingDeleteId(user.id)}
              >
                <Trash aria-hidden size={12} className="mr-1" /> Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={isDialogOpen}
        onClose={handleDialogClose}
        title="Editar Usuário"
      >
        {selectedUser && (
          <EditUserAdminForm
            user={selectedUser}
            onSuccess={fetchUsers}
            onClose={handleDialogClose}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Excluir usuário"
        description="Tem certeza que deseja excluir este usuário?"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </CardContent>
  );
}
