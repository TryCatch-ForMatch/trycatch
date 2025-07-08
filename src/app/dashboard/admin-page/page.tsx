'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import InviteForm from '@/components/dashboard/invite/inviteForm';
import SkillForm from '@/components/dashboard/skill/skillForm';
import FormUserAdmin from '@/components/dashboard/user-admin/FormUserAdmin';
import Modal from '@/components/ui/modal';
import ProjectCard from '@/components/dashboard/PainelCards/CountProjectCard';
import UserCard from '@/components/dashboard/PainelCards/CountUserCard';
import InviteCard from '@/components/dashboard/PainelCards/CountInviteCard';
import SkillCard from '@/components/dashboard/PainelCards/CountSkillCard';
import StackCard from '@/components/dashboard/PainelCards/CountStackCard';

export default function AdminPage() {
  const [openInvite, setOpenInvite] = useState(false);
  const [openSkill, setOpenSkill] = useState(false);
  const [openUserAdmin, setOpenUserAdmin] = useState(false);

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Painel Administrativo</h1>

      {/* Painel com os números e status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <ProjectCard></ProjectCard>
        <UserCard></UserCard>
        <InviteCard></InviteCard>
        <SkillCard></SkillCard>
        <StackCard></StackCard>
      </div>

      {/* Botões de Ação */}
      <div className="mt-6 flex flex-wrap gap-4">
        <Button onClick={() => setOpenInvite(true)}>Cadastrar Convite</Button>
        <Button onClick={() => setOpenSkill(true)}>Cadastrar Skill</Button>
        <Button onClick={() => setOpenUserAdmin(true)}>
          Cadastrar User Admin
        </Button>
      </div>

      {/* Modal Convite */}
      <Modal
        open={openInvite}
        onClose={() => setOpenInvite(false)}
        title="Cadastro de Convite"
      >
        <InviteForm />
      </Modal>

      {/* Modal Skill */}
      <Modal
        open={openSkill}
        onClose={() => setOpenSkill(false)}
        title="Cadastro de Skill / Stack"
      >
        <SkillForm />
      </Modal>

      {/* Modal User Admin */}
      <Modal
        open={openUserAdmin}
        onClose={() => setOpenUserAdmin(false)}
        title="Cadastro de Usuário Admin"
      >
        <FormUserAdmin />
      </Modal>
    </main>
  );
}
