'use client';

import InviteForm from '@/components/dashboard/invite/inviteForm';
import InviteList from '@/components/dashboard/invite/inviteList';
import SkillList from '@/components/dashboard/skill/skillList';
// import SkillForm from "@/components/dashboard/skill/skillForm";

export default function AdminPage() {
  return (
    <main>
      <h1>Admin Page</h1>
      <InviteForm></InviteForm>
      <InviteList></InviteList>
      <SkillList></SkillList>
      {/* <SkillForm></SkillForm> */}
    </main>
  );
}
