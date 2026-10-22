import { InviteForm, InviteList } from '@/components/Dashboard/Invite';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

export default function InvitePage() {
  return (
    <>
      <div className="m-8 flex justify-end">
        <Modal
          title="Criar Novo Convite"
          trigger={
            <Button className="h-10">
              Novo Convite
              <Plus aria-hidden />
            </Button>
          }
        >
          <InviteForm />
        </Modal>
      </div>

      <InviteList />
    </>
  );
}
