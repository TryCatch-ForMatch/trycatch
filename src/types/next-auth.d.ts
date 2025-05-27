import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    avatar?: string;
  }

  interface Session {
    user: User & {
      id: string;
      avatar?: string;
    };
  }
}
