import React from 'react';

export function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
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
    <div className="flex items-start gap-3 p-5 border-b border-border bg-muted/30">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}
