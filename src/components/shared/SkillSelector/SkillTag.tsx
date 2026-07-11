'use client';

import { X } from 'lucide-react';

type SkillTagProps = {
  readonly id: string;
  readonly name: string;
  readonly onRemove: (id: string) => void;
};

export function SkillTag({ id, name, onRemove }: SkillTagProps) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-xs">
      {name}

      <button
        type="button"
        title="Remover skill"
        aria-label={`Remover ${name}`}
        onClick={() => onRemove(id)}
      >
        <X size={12} />
      </button>
    </span>
  );
}
