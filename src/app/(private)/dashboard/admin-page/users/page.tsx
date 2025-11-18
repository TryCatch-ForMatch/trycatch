import { UserAdminForm, UserAdminList } from '@/components/Dashboard/UserAdmin';
import GenericModalButton from '@/components/ModalButton/ModalButton';
import BasePage from '@/components/Dashboard/BasePage';

export default function InvitePage() {
  return (
    <BasePage>
      <div className="m-8 flex justify-end">
        <GenericModalButton
          buttonLabel="Novo Usuário"
          title="Criar Novo Usuário"
          size="md"
        >
          <UserAdminForm />
        </GenericModalButton>
      </div>

      <UserAdminList />
    </BasePage>
  );
}
