'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

//import types
import { IAvailability } from '@/types/interface/IAvailability';

//import hook
import { useSkills } from '@/hooks/useSkills';

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

export function UserAvailabilityForm() {
  const router = useRouter();
  const {allSkills, allUserSkills } =useSkills()
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

  const onToggleWeekday = (dayIndex: number) => {
    const idx = fields.findIndex((f) => f.weekday === dayIndex);
    if (idx >= 0) {
      remove(idx);
    } else {
      append({ weekday: dayIndex, startTime: '', endTime: '' });
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
        throw new Error(
          json.error || 'Erro ao cadastrar configurações do usuário'
        );
      }

      toast.success('Configurações do usuário criadas com sucesso!');
      router.push('/dashboard/team-projects');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const availableSkills = allSkills.filter((s) => !selectedSkills.includes(s.id??"") && !allUserSkills.some(item=>item.skill?.id===s.id));

  return (
    <Card className="mx-auto mt-6 max-w-4xl rounded-2xl p-6 shadow-lg">
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
                  <SelectItem key={skill.id} value={skill?.id??""}>
                    {skill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.skills && (
              <p className="text-sm text-red-500">{errors.skills.message}</p>
            )}

            {/* Listagem das skills selecionadas */}
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSkills.map((skillId: string) => {
                const skill = allSkills.find((s) => s.id === skillId);
                
                return (
                  <span
                    key={skillId}
                    className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-xs"
                  >
                    {skill?.name || skillId}
                    <button
                      type="button"
                      onClick={() =>
                        setValue(
                          'skills',
                          selectedSkills.filter((id) => id !== skillId)
                        )
                      }
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

            {/* Mostrando minha Skills */}
            <Label className='font-medium'>Minhas Skils {allUserSkills.length ||0}</Label>
            <div className='flex items-start gap-3 font-normal'>
            {
              allUserSkills.map((item)=>(
                <div key={item.id} className='flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-base'>
                  <span className=''>{item.skill?.name}</span>
                </div>
              ))
            }
          </div>
          {/* Dias da semana e horários */}
          <div>
            <Label className="mb-2 block font-semibold text-gray-700">
              Dias da semana e horários
            </Label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {weekdays.map((day, i) => {
                const field = fields.find((f) => f.weekday === i);
                return (
                  <div key={i} className="flex flex-col rounded-lg border p-3">
                    <label className="flex cursor-pointer items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={!!field}
                        onChange={() => onToggleWeekday(i)}
                        className="h-5 w-5 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-base font-medium">{day}</span>
                    </label>

                    {field && (
                      <div className="mt-3 flex space-x-3">
                        <div className="flex flex-col">
                          <Label className="mb-1 text-sm">Início</Label>
                          <Input
                            type="time"
                            {...register(
                              `availabilities.${fields.indexOf(field)}.startTime` as const,
                              { required: true }
                            )}
                            defaultValue={field.startTime}
                          />
                        </div>

                        <div className="flex flex-col">
                          <Label className="mb-1 text-sm">Término</Label>
                          <Input
                            type="time"
                            {...register(
                              `availabilities.${fields.indexOf(field)}.endTime` as const,
                              { required: true }
                            )}
                            defaultValue={field.endTime}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {errors.availabilities && (
              <p className="mt-2 text-sm text-red-600">
                {errors.availabilities.message}
              </p>
            )}{' '}
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
