'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import InviteForm from '@/components/dashboard/invite/inviteForm';
import SkillForm from '@/components/dashboard/skill/skillForm';
import FormUserAdmin from '@/components/dashboard/user-admin/FormUserAdmin';
import Modal from '@/components/ui/modal'; // Crie esse componente simples de modal ou use o shadcn/ui dialog

export default function AdminPage() {
  const [openInvite, setOpenInvite] = useState(false);
  const [openSkill, setOpenSkill] = useState(false);
  const [openUserAdmin, setOpenUserAdmin] = useState(false);

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Painel Administrativo</h1>

      {/* Painel com os números e status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl p-4 shadow">
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Projetos </p>
            <p className="text-2xl font-bold">[Número]</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl p-4 shadow">
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Usuários Cadastrados
            </p>
            <p className="text-2xl font-bold">[Número]</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl p-4 shadow">
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Convites Pendentes</p>
            <p className="text-2xl font-bold">[Número]</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl p-4 shadow">
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Skills</p>
            <p className="text-2xl font-bold">[Número]</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl p-4 shadow">
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Stacks</p>
            <p className="text-2xl font-bold">[Número]</p>
          </CardContent>
        </Card>
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
