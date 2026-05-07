import { ROLES, type Role } from '@/lib/roles';

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: 'Admin',
  MENTOR: 'Mentor',
  USER: 'Membro',
};

export const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: ROLES.USER, label: ROLE_LABELS.USER },
  { value: ROLES.MENTOR, label: ROLE_LABELS.MENTOR },
  { value: ROLES.ADMIN, label: ROLE_LABELS.ADMIN },
];

export function getRoleLabel(role: string | null | undefined): string {
  if (!role) return '';

  return ROLE_LABELS[role as Role] ?? role;
}
