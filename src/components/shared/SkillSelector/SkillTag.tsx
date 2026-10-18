'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type SkillTagProps = {
  readonly id: string;
  readonly name: string;
  readonly onRemove: (id: string) => void;
};

export function SkillTag({ id, name, onRemove }: SkillTagProps) {
  return (
    <Badge variant="secondary" className="rounded-full px-3 py-1 font-normal">
      {name}

      <button
        type="button"
        aria-label={`Remover ${name}`}
        onClick={() => onRemove(id)}
        className="rounded-full hover:text-destructive focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <X aria-hidden size={12} />
      </button>
    </Badge>
  );
}
