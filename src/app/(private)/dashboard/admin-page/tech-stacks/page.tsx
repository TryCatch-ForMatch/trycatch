import { TechStackForm, TechStackList } from '@/components/Dashboard/TechStack';
import GenericModalButton from '@/components/ModalButton/ModalButton';
import BasePage from '@/components/Dashboard/BasePage';

export default function InvitePage() {
  return (
    <BasePage>
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
    </BasePage>
  );
}
