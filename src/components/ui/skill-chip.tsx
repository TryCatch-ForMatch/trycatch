import { Badge } from '@/components/ui/badge';
import { SkillIcon } from '@/components/ui/skill-icon';

interface SkillChipProps {
  name: string;
  iconUrl?: string | null;
}

export function SkillChip({ name, iconUrl }: SkillChipProps) {
  return (
    <Badge
      variant="secondary"
      className="gap-1.5 rounded-full border-border/50 font-normal"
    >
      {iconUrl && <SkillIcon src={iconUrl} name={name} />}
      {name}
    </Badge>
  );
}
