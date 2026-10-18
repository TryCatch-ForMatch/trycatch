import React from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5 px-5 py-1">
      <Label htmlFor={htmlFor} className="text-xs text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
