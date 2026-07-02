'use client';

import { useEffect, useMemo, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Stack {
  id: string;
  name: string;
}

interface StackItem {
  stackId: string;
  percentage: number;
}

export function ProjectStackSelector({
  stackAssignments = {},
}: Readonly<{ stackAssignments?: Record<string, string> }>) {
  const { control, setValue, watch } = useFormContext();
  const watchedStacks = watch('stacks');
  const stacks: StackItem[] = useMemo(
    () => watchedStacks || [],
    [watchedStacks]
  );

  const [availableStacks, setAvailableStacks] = useState<Stack[]>([]);

  // Buscar stacks da API
  useEffect(() => {
    const fetchStacks = async () => {
      try {
        const res = await fetch('/api/tech-stack');
        const data = await res.json();
        setAvailableStacks(data || []);
      } catch (err) {
        console.error('Erro ao buscar stacks:', err);
      }
    };
    fetchStacks();
  }, []);

  // Inicializa uma linha se não houver nenhuma
  useEffect(() => {
    if (stacks.length === 0) {
      setValue('stacks', [{ stackId: '', percentage: 0 }]);
    }
  }, [stacks, setValue]);

  // Adicionar nova linha
  const addStack = () => {
    setValue('stacks', [...stacks, { stackId: '', percentage: 0 }]);
  };

  // Remover linha
  const removeStack = (index: number) => {
    const newStacks = [...stacks];
    newStacks.splice(index, 1);
    setValue('stacks', newStacks);
  };

  // Soma dos percentuais
  const total = stacks.reduce((sum, s) => sum + (s.percentage || 0), 0);
  const errorMessage =
    total < 100
      ? `A soma deve ser 100%. Atualmente está em ${total}% (faltam ${100 - total}%).`
      : total > 100
        ? `A soma deve ser 100%. Atualmente está em ${total}% (excedeu ${total - 100}%).`
        : '';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Stacks do projeto
          </p>
          <p className="text-xs text-slate-500">
            Defina cada stack e seu percentual. A soma precisa fechar em 100%.
          </p>
        </div>
        <Button
          type="button"
          onClick={addStack}
          className="rounded-lg bg-[#3B38A0] px-3 py-2 text-sm text-white shadow-sm hover:bg-[#33318c]"
        >
          + Adicionar
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {stacks.map((stack, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex-1">
                <Controller
                  control={control}
                  name={`stacks.${index}.stackId`}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger className="h-11 w-full rounded-xl border border-slate-300 bg-white shadow-sm">
                        <SelectValue placeholder="Selecione a stack..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableStacks.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex items-center gap-2 sm:w-[162px]">
                <Controller
                  control={control}
                  name={`stacks.${index}.percentage`}
                  render={({ field }) => (
                    <div className="flex h-10 w-full items-center rounded-xl border border-slate-300 bg-white px-3 shadow-sm">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={field.value ?? 0}
                        onFocus={(e) => {
                          if (e.target.value === '0') {
                            e.target.value = '';
                          }
                        }}
                        onBlur={(e) => {
                          if (e.target.value === '') {
                            field.onChange(0);
                          }
                        }}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="mt-4 h-full w-full border-0 bg-transparent p-0 text-center text-sm shadow-none focus-visible:ring-0"
                      />
                      <span className="text-sm font-medium text-slate-500">
                        %
                      </span>
                    </div>
                  )}
                />
                <button
                  type="button"
                  onClick={() => removeStack(index)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  aria-label="Remover stack"
                >
                  ×
                </button>
              </div>
            </div>

            {stack.stackId && stackAssignments[stack.stackId] ? (
              <span className="text-[10px] leading-4 text-slate-500">
                {stackAssignments[stack.stackId]}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {errorMessage && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
