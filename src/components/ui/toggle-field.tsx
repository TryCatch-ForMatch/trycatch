'use client';

import React from 'react';
import { Switch } from '@/components/ui/switch';

interface ToggleFieldProps {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleField({
  icon,
  label,
  description,
  checked,
  onChange,
}: ToggleFieldProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="flex min-w-0 items-start gap-3">
        {icon && (
          <span className="mt-0.5 flex-shrink-0 text-muted-foreground">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <p className="text-sm text-foreground">{label}</p>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </div>
  );
}
