import { TechStackForm, TechStackList } from '@/components/Dashboard/TechStack';
import GenericModalButton from '@/components/ModalButton/ModalButton';

export default function InvitePage() {
  return (
    <>
      <div className="m-8 flex justify-end">
        <GenericModalButton
          buttonLabel="Nova Stack"
          title="Criar Nova Stack"
          size="md"
        >
          <TechStackForm />
        </GenericModalButton>
      </div>

      <TechStackList />
    </>
  );
}
