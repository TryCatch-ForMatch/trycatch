'use client';

import { useId, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Label } from '@/components/ui/label';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';
import { useSkills } from '@/hooks/api/useSkills';
import { SkillTag } from './SkillTag';
import { normalizeSkillName } from '@/lib/normalize-skill-name';

type SkillSelectorProps = {
  readonly label?: string;
  readonly placeholder?: string;
  readonly selectedSkills: string[];
  readonly errorMessage?: string;
  readonly onAddSkill: (skillId: string) => void;
  readonly onRemoveSkill: (skillId: string) => void;
  readonly allowCreate?: boolean;
};

export function SkillSelector({
  label = 'Selecionar Skills',
  placeholder = 'Buscar skill...',
  selectedSkills,
  errorMessage,
  onAddSkill,
  onRemoveSkill,
}: SkillSelectorProps) {
  const { allSkills, registerSkills } = useSkills();

  const [search, setSearch] = useState('');
  const inputId = useId();

  const availableSkills = useMemo(
    () =>
      allSkills.filter(
        (skill) => !!skill.id && !selectedSkills.includes(skill.id)
      ),
    [allSkills, selectedSkills]
  );

  const filteredSkills = useMemo(() => {
    const term = normalizeSkillName(search);

    if (!term) {
      return availableSkills;
    }

    return availableSkills.filter((skill) =>
      skill.normalizedName?.includes(term)
    );
  }, [availableSkills, search]);

  const handleCreateSkill = async () => {
    const name = search.trim();

    if (!name) return;

    try {
      const skill = await registerSkills({ name });

      onAddSkill(skill.id);
      setSearch('');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao criar skill.'));
    }
  };

  const handleSelectSkill = (skillId: string) => {
    onAddSkill(skillId);
    setSearch('');
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>

      <Command shouldFilter={false} className="rounded-md border">
        <CommandInput
          id={inputId}
          value={search}
          onValueChange={setSearch}
          placeholder={placeholder}
        />
        <CommandList className="max-h-56">
          {filteredSkills.map((skill) => (
            <CommandItem
              key={skill.id}
              value={skill.id}
              onSelect={() => handleSelectSkill(skill.id!)}
            >
              {skill.name}
            </CommandItem>
          ))}

          {filteredSkills.length === 0 && search.trim() && (
            <CommandItem
              value="__criar-skill__"
              onSelect={handleCreateSkill}
              className="text-primary"
            >
              + Criar <strong>{search.trim()}</strong>
            </CommandItem>
          )}
        </CommandList>
      </Command>

      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {selectedSkills.map((skillId) => {
          const skill = allSkills.find((item) => item.id === skillId);

          return (
            <SkillTag
              key={skillId}
              id={skillId}
              name={skill?.name ?? skillId}
              onRemove={onRemoveSkill}
            />
          );
        })}
      </div>
    </div>
  );
}
