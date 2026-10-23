import { TechStackForm, TechStackList } from '@/components/Dashboard/TechStack';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

export default function InvitePage() {
  return (
    <>
      <div className="m-8 flex justify-end">
        <Modal
          title="Criar Nova Stack"
          trigger={
            <Button className="h-10">
              Nova Stack
              <Plus aria-hidden />
            </Button>
          }
        >
          <TechStackForm />
        </Modal>
      </div>

      <TechStackList />
    </>
  );
}
