import { SkillForm, SkillList } from '@/components/Dashboard/Skill';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

export default function InvitePage() {
  return (
    <>
      <div className="m-8 flex justify-end">
        <Modal
          title="Criar Nova Skill"
          trigger={
            <Button className="h-10">
              Nova Skill
              <Plus aria-hidden />
            </Button>
          }
        >
          <SkillForm />
        </Modal>
      </div>

      <SkillList />
    </>
  );
}
