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

export function ProjectStackSelector() {
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
      {/* Título e botão adicionar */}
      <div className="flex h-8.25 items-center justify-between">
        <span className="text-lg font-medium text-[#312E41]">Stacks</span>
        <Button
          type="button"
          onClick={addStack}
          className="h-8.25 w-28.75 rounded-lg bg-[#3B38A0] text-white shadow-md"
        >
          Adicionar
        </Button>
      </div>

      {/* Linhas de stacks */}
      <div className="flex flex-col gap-3">
        {stacks.map((stack, index) => (
          <div key={index} className="flex h-10 items-center gap-1">
            {/* Select para stack */}
            <Controller
              control={control}
              name={`stacks.${index}.stackId`}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => field.onChange(val)}
                >
                  <SelectTrigger className="w-100 rounded-xl border border-[#3B38A0] bg-white">
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

            {/* Input percentual */}
            <Controller
              control={control}
              name={`stacks.${index}.percentage`}
              render={({ field }) => (
                <div className="mt-4 flex h-10 w-18 items-center">
                  <Input
                    type="number"
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
                    className="h-10 w-full rounded-xl border border-[#3B38A0] text-center"
                  />
                </div>
              )}
            />
            <p>%</p>

            {/* Botão remover */}
            <button
              type="button"
              onClick={() => removeStack(index)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#3B38A0] transition-colors hover:bg-[#3B38A022]"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Mensagem de erro */}
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
