import { InviteForm, InviteList } from '@/components/Dashboard/Invite';
import GenericModalButton from '@/components/ModalButton/ModalButton';
import BasePage from '@/components/Dashboard/BasePage';

export default function InvitePage() {
  return (
    <BasePage>
      <div className="m-8 flex justify-end">
        <GenericModalButton
          buttonLabel="Novo Convite"
          title="Criar Novo Convite"
          size="md"
        >
          <InviteForm />
        </GenericModalButton>
      </div>

      <InviteList />
    </BasePage>
  );
}
