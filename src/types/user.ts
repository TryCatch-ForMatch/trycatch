export interface BasicUser {
  id: string;
  name: string;
  email: string;
}

export interface FullUser extends BasicUser {
  avatar?: string;
  linkedin?: string;
  github?: string;
  bio?: string;
  role: 'USER' | 'ADMIN';
  skills?: { skill: { id: string; name: string } }[];
}
