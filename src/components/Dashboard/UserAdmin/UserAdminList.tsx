'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/UI/card';
import { Button } from '@/components/UI/button';
import { Pencil, Trash } from 'lucide-react';
import { BasicUser, FullUser } from '@/types/user';
import { EditUserAdminForm } from './EditUserAdminForm';
import Modal from '@/components/UI/modal';

export function UserAdminList() {
  const [users, setUsers] = useState<BasicUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FullUser | null>(null);

  const fetchUsers = async () => {
    const res = await fetch('/api/user-admin');
    const data: BasicUser[] = await res.json();
    setUsers(data);
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const handleEdit = async (userId: string) => {
    const res = await fetch(`/api/user-admin/${userId}`);
    const userData: FullUser = await res.json();
    setSelectedUser(userData);
    setIsDialogOpen(true);
  };

  return (
    <Card className="mx-auto mt-6 max-w-4xl rounded-2xl shadow-md">
      {/* Conteúdo com scroll, se necessário */}
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

            {/* Botões de ação */}
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

      {/* Modal fora do CardContent para não rolar junto */}
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
