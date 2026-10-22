'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { useState } from 'react';
import { InputField } from '@/components/ui/input-field';

type MoneyInputProps<FormData extends FieldValues> = {
  name: Path<FormData>;
  control: Control<FormData>;
  id?: string;
};

export function MoneyInput<FormData extends FieldValues>({
  name,
  control,
  id,
}: MoneyInputProps<FormData>) {
  const [text, setText] = useState('');

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputField
          id={id}
          type="text"
          inputMode="decimal"
          placeholder="0,00"
          value={text}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d,]/g, '');
            setText(value);

            const number = Number(value.replace(',', '.'));
            if (!isNaN(number)) {
              field.onChange(number);
            }
          }}
          onBlur={() => {
            const number = typeof field.value === 'number' ? field.value : 0;

            const formatted = number.toFixed(2).replace('.', ',');
            setText(formatted);
            field.onChange(number);
          }}
          onFocus={() => {
            if (typeof field.value === 'number') {
              setText(field.value.toString().replace('.', ','));
            }
          }}
        />
      )}
    />
  );
}
