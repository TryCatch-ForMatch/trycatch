import { UserAdminForm, UserAdminList } from '@/components/Dashboard/UserAdmin';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

export default function UsersPage() {
  return (
    <>
      <div className="m-8 flex justify-end">
        <Modal
          title="Criar Novo Usuário"
          trigger={
            <Button className="h-10">
              Novo Usuário
              <Plus aria-hidden />
            </Button>
          }
        >
          <UserAdminForm />
        </Modal>
      </div>

      <UserAdminList />
    </>
  );
}
