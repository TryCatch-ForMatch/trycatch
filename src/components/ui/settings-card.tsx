import React from 'react';

export function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {children}
    </div>
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
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
