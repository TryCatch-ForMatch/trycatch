'use client';

import { useId, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
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
  const listId = `${inputId}-list`;

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

  const canCreate = filteredSkills.length === 0 && !!search.trim();

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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();

    if (!search.trim()) return;

    const [firstSkill] = filteredSkills;

    if (firstSkill?.id) {
      handleSelectSkill(firstSkill.id);
    } else if (canCreate) {
      void handleCreateSkill();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>

      <InputGroup>
        <InputGroupAddon>
          <Search aria-hidden />
        </InputGroupAddon>
        <InputGroupInput
          id={inputId}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-controls={filteredSkills.length > 0 ? listId : undefined}
        />
      </InputGroup>

      {filteredSkills.length > 0 && (
        <ul
          id={listId}
          aria-label={label}
          className="max-h-56 overflow-y-auto rounded-md border bg-background p-1"
        >
          {filteredSkills.map((skill) => (
            <li key={skill.id}>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleSelectSkill(skill.id!)}
                className="w-full justify-start font-normal"
              >
                {skill.name}
              </Button>
            </li>
          ))}
        </ul>
      )}

      {canCreate && (
        <Button
          type="button"
          variant="outline"
          onClick={handleCreateSkill}
          className="w-full justify-start font-normal text-primary"
        >
          + Criar <strong>{search.trim()}</strong>
        </Button>
      )}

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
