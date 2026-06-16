import Image from 'next/image';

interface SkillChipProps {
  name: string;
  iconUrl?: string | null;
  width?: number;
  height?: number;
}

export function SkillChip({ name, iconUrl, height, width }: SkillChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
      {iconUrl && (
        <Image
          src={iconUrl}
          alt={'icone >' + name}
          width={width ?? 14}
          height={height ?? 14}
        />
      )}
      {name}
    </span>
  );
}
