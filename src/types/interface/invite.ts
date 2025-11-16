import { Role } from '@/lib/roles';

export interface Invite {
  id: string;
  email: string;
  code: string;
  used: boolean;
  role: Role; // USER | ADMIN | MENTOR
}
