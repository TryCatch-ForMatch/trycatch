interface SectionProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export function Section({ icon, title, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}
