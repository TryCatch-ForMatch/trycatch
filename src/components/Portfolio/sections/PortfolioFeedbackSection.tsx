import { Star } from 'lucide-react';
import type { PortfolioPublicResponse } from '@/types/portfolio.types';
import { Section } from '@/components/ui/section';

interface PortfolioFeedbackSectionProps {
  data: PortfolioPublicResponse;
}

export function PortfolioFeedbackSection({ data }: PortfolioFeedbackSectionProps) {
  if (!data.feedback || data.feedback.length === 0) return null;

  return (
    <Section icon={<Star className="w-4 h-4" />} title="Feedback recebido">
      <div className="space-y-3">
        {data.feedback.map((fb) => (
          <div
            key={fb.id}
            className="rounded-lg border border-border bg-card p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < fb.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {fb.givenBy ?? 'Avaliação anônima'} · {fb.projectName}
              </span>
            </div>
            {fb.comment && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                &quot;{fb.comment}&quot;
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
