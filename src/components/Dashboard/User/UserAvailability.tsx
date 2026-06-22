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

const weekdays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

const schema = z.object({
  skills: z.array(z.string(), {
    error: 'Selecione ao menos uma skill',
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

export function UserAvailability() {
  const router = useRouter();

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
      availabilities: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'availabilities',
  });

  useEffect(() => {
    fetch('/api/user-availability/me')
      .then((res) => res.json())
      .then((data) => setUserAvailability(data))
      .catch(() => {
        toast.error('Erro ao carregar disponibilidade do usuário');
      });
  }, []);

  useEffect(() => {
    if (!userAvailability?.availability?.length) return;

    setValue(
      'availabilities',
      userAvailability.availability.map((availability) => ({
        weekday: availability.weekday,
        startTime: availability.startTime,
        endTime: availability.endTime,
      }))
    );
  }, [userAvailability, setValue]);

  const onToggleWeekday = (dayIndex: number, checked: boolean) => {
    const idx = fields.findIndex((field) => field.weekday === dayIndex);

    if (checked && idx === -1) {
      append({ weekday: dayIndex, startTime: '', endTime: '' });
    }

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

  return (
    <Card className="mx-auto mt-6 rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
