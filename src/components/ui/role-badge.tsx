import { Badge } from '@/components/ui/badge';
import { getRoleLabel } from '@/lib/role-labels';

const roleVariant = {
  ADMIN: 'default',
  MENTOR: 'secondary',
  USER: 'outline',
} as const;

export function RoleBadge({ role }: { role: string }) {
  const variant = roleVariant[role as keyof typeof roleVariant] ?? 'outline';

  return (
    <Badge variant={variant} className="rounded-full">
      {getRoleLabel(role)}
    </Badge>
  );
}
