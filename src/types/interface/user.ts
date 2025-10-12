export interface BasicUser {
  id: string;
  name: string;
  email: string;
}

export interface User extends BasicUser {
  password?: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
  bio?: string;
  skills?: { skill: { id: string; name: string } }[];
}

export interface FullUser extends BasicUser {
  avatar?: string;
  linkedin?: string;
  github?: string;
  bio?: string;
  role: 'USER' | 'ADMIN';
  skills?: { skill: { id: string; name: string } }[];
}
