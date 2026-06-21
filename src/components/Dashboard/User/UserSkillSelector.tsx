'use client';

import { X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useSkills } from '@/hooks/api/useSkills';

type Props = {
  readonly selectedSkills: string[];
  readonly errorMessage?: string;
  readonly onAddSkill: (skillId: string) => void;
  readonly onRemoveSkill: (skillId: string) => void;
};

export function UserSkillSelector({
  selectedSkills,
  errorMessage,
  onAddSkill,
  onRemoveSkill,
}: Props) {
  const { allSkills } = useSkills();

  const availableSkills = allSkills.filter(
    (skill) => !!skill.id && !selectedSkills.includes(skill.id)
  );

  return (
    <div className="space-y-2">
      <Label>Selecionar Skills</Label>

      <Select
        value=""
        onValueChange={(value: string) => {
          if (value && !selectedSkills.includes(value)) {
            onAddSkill(value);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma skill" />
        </SelectTrigger>
        <SelectContent>
          {availableSkills.map((skill) => (
            <SelectItem key={skill.id} value={skill.id ?? ''}>
              {skill.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        {selectedSkills.map((skillId) => {
          const skill = allSkills.find((s) => s.id === skillId);

          return (
            <span
              key={skillId}
              className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-xs"
            >
              {skill?.name ?? skillId}
              <button
                type="button"
                onClick={() => onRemoveSkill(skillId)}
                title="Remover skill"
              >
                <X size={12} />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
