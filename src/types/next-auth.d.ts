import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'ADMIN' | 'USER';
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
      role: 'ADMIN' | 'USER';
    };
  }

  declare module 'next-auth/jwt' {
    interface JWT {
      id: string;
      name: string;
      email: string;
      avatar?: string;
      role: 'ADMIN' | 'USER';
    }
  }
}
