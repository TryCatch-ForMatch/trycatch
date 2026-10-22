import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
}

function InputField({
  className,
  label,
  error,
  id,
  ...props
}: InputFieldProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="mb-4">
      {label && (
        <Label htmlFor={inputId} className="mb-1 block leading-5">
          {label}
        </Label>
      )}
      <Input
        id={inputId}
        className={cn('flex py-4', error && 'border-destructive', className)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { InputField };
