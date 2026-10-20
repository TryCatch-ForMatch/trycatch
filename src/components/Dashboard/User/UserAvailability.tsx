'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { InputField } from '@/components/ui/input-field';
import { Switch } from '@/components/ui/switch';
import { Moon } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { IAvailability } from '@/types/interface/IAvailability';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';

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
    apiTryCatch
      .get<UserAvailabilityResponse>('/user-availability/me')
      .then(({ data }) => setUserAvailability(data))
      .catch((error) => {
        toast.error(
          getApiErrorMessage(
            error,
            'Erro ao carregar disponibilidade do usuário'
          )
        );
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
      await apiTryCatch.post('/user-availability', data);

      toast.success('Configurações salvas com sucesso!');
      router.push('/dashboard/team-projects');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao salvar configurações'));
    }
  };

  return (
    <Card className="mx-auto mt-6 rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-sm leading-none font-semibold">
              Disponibilidade de horários
            </h2>

            <div className="mt-6 flex flex-col gap-2">
              {weekdays.map((day, i) => {
                const field = fields.find((f) => f.weekday === i);

                return (
                  <div
                    key={i}
                    className="grid grid-cols-[160px_1fr] items-center gap-6 rounded-lg p-3"
                  >
                    <Label className="flex items-center gap-4">
                      <Switch
                        checked={!!field}
                        onCheckedChange={(checked) =>
                          onToggleWeekday(i, checked)
                        }
                      />
                      {day}
                    </Label>

                    {field ? (
                      <div className="flex gap-6">
                        <InputField
                          type="time"
                          aria-label={`Início em ${day}`}
                          {...register(
                            `availabilities.${fields.indexOf(field)}.startTime`
                          )}
                        />
                        <InputField
                          type="time"
                          aria-label={`Fim em ${day}`}
                          {...register(
                            `availabilities.${fields.indexOf(field)}.endTime`
                          )}
                        />
                      </div>
                    ) : (
                      <span className="flex gap-2 text-sm text-muted-foreground">
                        <Moon aria-hidden /> Indisponível
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {errors.availabilities && (
              <p className="text-sm text-destructive">
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
