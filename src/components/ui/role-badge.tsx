const roleConfig: Record<string, { label: string; className: string }> = {
  MENTOR: {
    label: 'Mentor',
    className: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  },
  ADMIN: {
    label: 'Admin',
    className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  },
  USER: {
    label: 'Dev',
    className: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  },
};

export function RoleBadge({ role }: { role: string }) {
  const config = roleConfig[role] ?? {
    label: role,
    className: 'bg-muted text-muted-foreground',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
