'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import InviteForm from '@/components/dashboard/invite/inviteForm';
import SkillForm from '@/components/dashboard/skill/skillForm';
import UserAdminForm from '@/components/dashboard/user-admin/UserAdminForm';
import Modal from '@/components/ui/modal';
import ProjectCard from '@/components/dashboard/PainelCards/CountProjectCard';
import UserCard from '@/components/dashboard/PainelCards/CountUserCard';
import InviteCard from '@/components/dashboard/PainelCards/CountInviteCard';
import SkillCard from '@/components/dashboard/PainelCards/CountSkillCard';
import StackCard from '@/components/dashboard/PainelCards/CountStackCard';
import InviteList from '@/components/dashboard/invite/inviteList';
import SkillList from '@/components/dashboard/skill/skillList';
import UserAdminList from '@/components/dashboard/user-admin/UserAdminList';

export default function AdminPage() {
  const [openInvite, setOpenInvite] = useState(false);
  const [openSkill, setOpenSkill] = useState(false);
  const [openUserAdmin, setOpenUserAdmin] = useState(false);

  const [inviteList, setInviteList] = useState(false);
  const [skillList, setSkillList] = useState(false);
  const [userAdminList, setUserAdminList] = useState(false);

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
        <div className="flex flex-col space-y-6 p-6">
          <Button onClick={() => setOpenInvite(true)}>Cadastrar Convite</Button>
          <Button onClick={() => setInviteList(true)}>Listar Convites</Button>
        </div>
        <div className="flex flex-col space-y-6 p-6">
          <Button onClick={() => setOpenSkill(true)}>Cadastrar Skill</Button>
          <Button onClick={() => setSkillList(true)}>Listar Skills</Button>
        </div>
        <div className="flex flex-col space-y-6 p-6">
          <Button onClick={() => setOpenUserAdmin(true)}>
            Cadastrar Usuário
          </Button>
          <Button onClick={() => setUserAdminList(true)}>
            Listar Usuários
          </Button>
        </div>
      </div>

      {/* Modal Convite */}
      <Modal
        open={openInvite}
        onClose={() => setOpenInvite(false)}
        title="Cadastro de Convite"
      >
        <InviteForm />
      </Modal>
      <Modal
        open={inviteList}
        onClose={() => setInviteList(false)}
        title="Listar Convites"
      >
        <InviteList />
      </Modal>

      {/* Modal Skill */}
      <Modal
        open={openSkill}
        onClose={() => setOpenSkill(false)}
        title="Cadastro de Skill"
      >
        <SkillForm />
      </Modal>
      <Modal
        open={skillList}
        onClose={() => setSkillList(false)}
        title="Listar Skills"
      >
        <SkillList />
      </Modal>

      {/* Modal User Admin */}
      <Modal
        open={openUserAdmin}
        onClose={() => setOpenUserAdmin(false)}
        title="Cadastro de Usuário Admin"
      >
        <UserAdminForm />
      </Modal>
      <Modal
        open={userAdminList}
        onClose={() => setUserAdminList(false)}
        title="ListarUsuários"
      >
        <UserAdminList />
      </Modal>
    </main>
  );
}
