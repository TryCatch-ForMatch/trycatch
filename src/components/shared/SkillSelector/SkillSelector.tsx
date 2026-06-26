'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
      console.error(error);
    }
  };

  const handleSelectSkill = (skillId: string) => {
    onAddSkill(skillId);
    setSearch('');
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="relative">
        <Search
          size={16}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="pl-9"
        />
      </div>

      {filteredSkills.length > 0 && (
        <div className="max-h-56 overflow-y-auto rounded-md border bg-background">
          {filteredSkills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => handleSelectSkill(skill.id!)}
              className="flex w-full items-center px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
            >
              {skill.name}
            </button>
          ))}
        </div>
      )}

      {filteredSkills.length === 0 && search.trim() && (
        <button
          type="button"
          onClick={handleCreateSkill}
          className="flex w-full items-center rounded-md border px-3 py-2 text-left text-sm text-primary transition-colors hover:bg-muted"
        >
          <>
            + Criar <strong>{search.trim()}</strong>
          </>
        </button>
      )}

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

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
