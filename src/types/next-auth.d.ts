import 'next-auth';
import { Role } from '@/lib/roles';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
      role: Role;
    };
  }

  declare module 'next-auth/jwt' {
    interface JWT {
      id: string;
      name: string;
      email: string;
      avatar?: string;
      role: Role;
    }
  }
}
