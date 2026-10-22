import React from 'react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

export function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">{children}</Card>
  );
}

export function SettingsCardHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-border bg-muted/30 p-5">
      <span aria-hidden className="mt-0.5 text-muted-foreground">
        {icon}
      </span>
      <div>
        <CardTitle className="text-sm leading-normal font-medium text-foreground">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="mt-0.5 text-xs">
            {description}
          </CardDescription>
        )}
      </div>
    </div>
  );
}
