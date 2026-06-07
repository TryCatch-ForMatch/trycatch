import { UserAdminForm, UserAdminList } from '@/components/Dashboard/UserAdmin';
import GenericModalButton from '@/components/ModalButton/ModalButton';

export default function InvitePage() {
  return (
    <>
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
    </>
  );
}
