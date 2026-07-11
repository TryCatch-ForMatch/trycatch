import { SkillForm, SkillList } from '@/components/Dashboard/Skill';
import GenericModalButton from '@/components/ModalButton/ModalButton';

export default function InvitePage() {
  return (
    <>
      <div className="m-8 flex justify-end">
        <GenericModalButton
          buttonLabel="Nova Skill"
          title="Criar Nova Skill"
          size="md"
        >
          <SkillForm />
        </GenericModalButton>
      </div>

      <SkillList />
    </>
  );
}
