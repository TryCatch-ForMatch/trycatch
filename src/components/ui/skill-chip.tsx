import Image from "next/image";

interface SkillChipProps {
  name: string;
  iconUrl?: string | null;
}

export function SkillChip({ name, iconUrl }: SkillChipProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full
                 text-xs bg-secondary text-secondary-foreground
                 border border-border/50"
    >
      {iconUrl && (
        <Image src={iconUrl} alt={'icone >' + name} className="w-3.5 h-3.5" />
      )}
      {name}
    </span>
  );
}
