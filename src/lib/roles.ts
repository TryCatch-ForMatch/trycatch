export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  MENTOR: 'MENTOR',
} as const;

export const ROLE_GROUPS = {
  ALL: [ROLES.ADMIN, ROLES.USER, ROLES.MENTOR],
  ADMIN: [ROLES.ADMIN],
};

export type Role = keyof typeof ROLES;
