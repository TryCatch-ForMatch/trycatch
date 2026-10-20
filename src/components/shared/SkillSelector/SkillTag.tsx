'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type SkillTagProps = {
  readonly id: string;
  readonly name: string;
  readonly onRemove: (id: string) => void;
};

export function SkillTag({ id, name, onRemove }: SkillTagProps) {
  return (
    <Badge variant="secondary" className="rounded-full px-3 py-1 font-normal">
      {name}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Remover ${name}`}
        onClick={() => onRemove(id)}
        className="size-4 rounded-full p-0 hover:bg-transparent hover:text-destructive"
      >
        <X aria-hidden className="size-3" />
      </Button>
    </Badge>
  );
}
