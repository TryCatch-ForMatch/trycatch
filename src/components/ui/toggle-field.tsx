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

export function ToggleField({ icon, label, description, checked, onChange }: ToggleFieldProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <span className="mt-0.5 text-muted-foreground flex-shrink-0">{icon}</span>
        )}
        <div className="min-w-0">
          <p className="text-sm text-foreground">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        aria-label={label}
      />
    </div>
  );
}
