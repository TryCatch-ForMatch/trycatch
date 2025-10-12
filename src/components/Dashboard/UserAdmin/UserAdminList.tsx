'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { BasicUser, FullUser } from '@/types/interface/user';
import { EditUserAdminForm } from './EditUserAdminForm';
import Modal from '@/components/ui/modal';
import { toast } from 'sonner';

export function UserAdminList() {
  const [users, setUsers] = useState<BasicUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FullUser | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/user-admin');
      if (!res.ok) throw new Error('Erro ao buscar usuários');
      const data: BasicUser[] = await res.json();
      setUsers(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    const confirmed = confirm('Tem certeza que deseja excluir este usuário?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/user-admin/${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Erro ao excluir usuário.');

      setUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success('Usuário excluído com sucesso!');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao excluir usuário'
      );
      console.error(error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const handleEdit = async (userId: string) => {
    try {
      const res = await fetch(`/api/user-admin/${userId}`);
      if (!res.ok) throw new Error('Erro ao carregar usuário');
      const userData: FullUser = await res.json();
      setSelectedUser(userData);
      setIsDialogOpen(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  };

  return (
    <Card className="mx-auto mt-6 max-w-4xl rounded-2xl shadow-md">
      <CardContent className="space-y-4 p-6">
        {users.map((user) => (
          <Card
            key={user.id}
            className="flex items-center justify-between p-4 shadow-sm"
          >
            <div className="flex items-center gap-1">
              <p className="w-40 truncate font-semibold">{user.name}</p>
              <p className="w-40 truncate text-sm text-gray-600">
                {user.email}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(user.id)}
              >
                <Pencil size={12} className="mr-1" /> Editar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(user.id)}
              >
                <Trash size={12} className="mr-1" /> Excluir
              </Button>
            </div>
          </Card>
        ))}
      </CardContent>

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
    </Card>
  );
}
