'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { InviteForm, InviteList } from '@/components/Dashboard/Invite';
import Modal from '@/components/ui/modal';
import {
  InviteCard,
  ProjectCard,
  SkillCard,
  StackCard,
  UserCard,
} from '@/components/dashboard/PainelCards';
import { SkillForm, SkillList } from '@/components/Dashboard/Skill';
import { UserAdminForm, UserAdminList } from '@/components/Dashboard/UserAdmin';
import { TechStackForm, TechStackList } from '@/components/Dashboard/TechStack';
import { useState } from 'react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [openInvite, setOpenInvite] = useState(false);
  const [openSkill, setOpenSkill] = useState(false);
  const [openStack, setOpenStack] = useState(false);
  const [openUserAdmin, setOpenUserAdmin] = useState(false);

  const [inviteList, setInviteList] = useState(false);
  const [skillList, setSkillList] = useState(false);
  const [stackList, setStackList] = useState(false);
  const [userAdminList, setUserAdminList] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/dashboard');
    } else if (session.user.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="p-6">Carregando...</div>;
  }

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
          <Button onClick={() => setOpenStack(true)}>Cadastrar Stack</Button>
          <Button onClick={() => setStackList(true)}>Listar Stacks</Button>
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
        // title="Cadastro de Convite"
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

      {/* Modal Stack */}
      <Modal
        open={openStack}
        onClose={() => setOpenStack(false)}
        title="Cadastro de Stack"
      >
        <TechStackForm />
      </Modal>
      <Modal
        open={stackList}
        onClose={() => setStackList(false)}
        title="Listar Stacks"
      >
        <TechStackList />
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
        title="Listar Usuários"
      >
        <UserAdminList />
      </Modal>
    </main>
  );
}
