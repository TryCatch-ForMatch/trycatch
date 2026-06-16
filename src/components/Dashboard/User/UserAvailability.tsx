'use client';

import { useEffect, useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Moon, X } from 'lucide-react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { IAvailability } from '@/types/interface/IAvailability';
import { useSkills } from '@/hooks/api/useSkills';

const schema = z.object({
  skills: z.array(z.string(), {
    required_error: 'Selecione ao menos uma skill',
  }),
  availabilities: z
    .array(
      z.object({
        weekday: z.number().int().min(0).max(6),
        startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
        endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      })
    )
    .min(1, 'Selecione pelo menos um dia com horário'),
});

type FormData = {
  skills: string[];
  availabilities: IAvailability[];
};

type UserAvailabilityResponse = {
  skills: { id: string }[];
  availability: IAvailability[];
};

export function UserAvailabilityForm() {
  const router = useRouter();
  const { allSkills } = useSkills();

  const [userAvailability, setUserAvailability] =
    useState<UserAvailabilityResponse | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: [],
      availabilities: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'availabilities',
  });

  const selectedSkills = watch('skills');

  const weekdays = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  useEffect(() => {
    fetch('/api/user-availability/me')
      .then((res) => res.json())
      .then((data) => setUserAvailability(data))
      .catch(() => {
        toast.error('Erro ao carregar disponibilidade do usuário');
      });
  }, []);

  // HIDRATA SKILLS NO FORM

  useEffect(() => {
    if (!userAvailability?.skills?.length) return;

    setValue(
      'skills',
      userAvailability.skills.map((s) => s.id)
    );
  }, [userAvailability, setValue]);

  // HIDRATA HORÁRIOS NO FORM

  useEffect(() => {
    if (!userAvailability?.availability?.length) return;

    setValue(
      'availabilities',
      userAvailability.availability.map((a) => ({
        weekday: a.weekday,
        startTime: a.startTime,
        endTime: a.endTime,
      }))
    );
  }, [userAvailability, setValue]);

  const onToggleWeekday = (dayIndex: number, checked: boolean) => {
    const idx = fields.findIndex((f) => f.weekday === dayIndex);

    // Ligando o dia
    if (checked && idx === -1) {
      append({ weekday: dayIndex, startTime: '', endTime: '' });
    }

    // Desligando o dia
    if (!checked && idx >= 0) {
      remove(idx);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/user-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Erro ao salvar configurações');
      }

      toast.success('Configurações salvas com sucesso!');
      router.push('/dashboard/team-projects');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const availableSkills = allSkills.filter(
    (s) => !selectedSkills.includes(s.id ?? '')
  );

  return (
    <Card className="mx-auto mt-6 rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Skills */}
          <div className="space-y-2">
            <Label>Selecionar Skills</Label>

            <Select
              onValueChange={(value: string) => {
                if (!selectedSkills.includes(value)) {
                  setValue('skills', [...selectedSkills, value]);
                }
              }}
              value=""
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

            {errors.skills && (
              <p className="text-sm text-red-500">{errors.skills.message}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSkills.map((skillId) => {
                const skill = allSkills.find((s) => s.id === skillId);

                return (
                  <span
                    key={skillId}
                    className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-xs"
                  >
                    {skill?.name}
                    <button
                      title="skills button"
                      type="button"
                      onClick={() =>
                        setValue(
                          'skills',
                          selectedSkills.filter((id) => id !== skillId)
                        )
                      }
                    >
                      <X size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Disponibilidade */}
          <div>
            <Label className="font-semibold">Disponibilidade de horários</Label>

            <div className="mt-6 flex flex-col gap-2">
              {weekdays.map((day, i) => {
                const field = fields.find((f) => f.weekday === i);

                return (
                  <div
                    key={i}
                    className="grid grid-cols-[160px_1fr] items-center gap-6 rounded-lg p-3"
                  >
                    <Label className="flex items-center gap-4">
                      <Switch.Root
                        checked={!!field}
                        onCheckedChange={(checked) =>
                          onToggleWeekday(i, checked)
                        }
                        className="relative h-6 w-11 rounded-full bg-gray-300 transition data-[state=checked]:bg-indigo-600"
                      >
                        <Switch.Thumb />
                      </Switch.Root>
                      {day}
                    </Label>

                    {field ? (
                      <div className="flex gap-6">
                        <input
                          type="time"
                          {...register(
                            `availabilities.${fields.indexOf(field)}.startTime`
                          )}
                        />
                        <input
                          type="time"
                          {...register(
                            `availabilities.${fields.indexOf(field)}.endTime`
                          )}
                        />
                      </div>
                    ) : (
                      <span className="flex gap-2 text-sm text-gray-400">
                        <Moon /> Indisponível
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {errors.availabilities && (
              <p className="text-sm text-red-600">
                {errors.availabilities.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
