'use client';

import { useEffect, useState, useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

type Skill = {
  id: string;
  name: string;
  iconUrl?: string;
};

export function ProjectSkillSelector() {
  const { control, setValue, watch } = useFormContext();
  const selectedSkills: string[] = watch('skills') || [];
  const [skills, setSkills] = useState<Skill[]>([]);
  const [search, setSearch] = useState('');

  // Busca skills no backend
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch('/api/skill');
        if (!res.ok) throw new Error('Erro ao buscar skills');
        const data = await res.json();
        setSkills(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSkills();
  }, []);

  // Filtro de skills
  const filteredSkills = useMemo(() => {
    return skills.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [skills, search]);

  // Alternar seleção
  const toggleSkill = (id: string) => {
    const updated = selectedSkills.includes(id)
      ? selectedSkills.filter((s) => s !== id)
      : [...selectedSkills, id];
    setValue('skills', updated, { shouldValidate: true });
  };

  return (
    <Controller
      name="skills"
      control={control}
      render={() => (
        <div className="flex flex-col gap-3">
          {/* Cabeçalho: título e busca */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#312E41]">Skills</h3>
            <Input
              placeholder="Buscar skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[282px] rounded-xl border border-[#C7C4D0] bg-[#F8F7FA] px-4 py-2 text-sm"
            />
          </div>

          {/* Lista de skills */}
          <div className="grid grid-cols-3 gap-3 rounded-xl border border-[#EAE9EE] bg-white p-6">
            {filteredSkills.length === 0 && (
              <p className="text-sm text-gray-400">Nenhuma skill encontrada</p>
            )}

            {filteredSkills.map((skill) => {
              const selected = selectedSkills.includes(skill.id);
              return (
                <button
                  type="button"
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors ${
                    selected
                      ? 'border-[#3B38A0] bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#3B38A0]'
                  }`}
                >
                  {skill.iconUrl && (
                    <Image
                      src={skill.iconUrl}
                      alt={skill.name}
                      width={15}
                      height={3}
                    />
                  )}
                  {skill.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    />
  );
}
