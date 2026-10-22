'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import type { Matcher } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  id?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  displayFormat?: string;
  disabled?: boolean;
  disabledDates?: Matcher | Matcher[];
  startMonth?: Date;
  endMonth?: Date;
  className?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

function DatePicker({
  id,
  value,
  onChange,
  placeholder = 'Selecione uma data',
  displayFormat = 'dd/MM/yyyy',
  disabled,
  disabledDates,
  startMonth,
  endMonth,
  className,
  ...ariaProps
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          data-empty={!value}
          className={cn(
            'w-full justify-between font-normal aria-invalid:border-destructive data-[empty=true]:text-muted-foreground',
            className
          )}
          {...ariaProps}
        >
          {value ? format(value, displayFormat, { locale: ptBR }) : placeholder}
          <CalendarIcon aria-hidden className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
          captionLayout="dropdown"
          startMonth={startMonth}
          endMonth={endMonth}
          disabled={disabledDates}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
