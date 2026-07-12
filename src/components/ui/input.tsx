import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="mb-2 block text-sm font-medium" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          data-slot="input"
          className={cn(
            'flex h-9 w-full min-w-0 rounded-md border border-[#35343c23] bg-transparent px-3 py-4 text-base transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
            error && 'border-destructive',
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
