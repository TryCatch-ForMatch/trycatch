import { Award } from 'lucide-react';
import type { PortfolioPublicResponse } from '@/types/portfolio.types';
import { Section } from '@/components/ui/section';

interface PortfolioCertificatesSectionProps {
  data: PortfolioPublicResponse;
}

export function PortfolioCertificatesSection({
  data,
}: PortfolioCertificatesSectionProps) {
  if (!data.certificates || data.certificates.length === 0) return null;

  return (
    <Section icon={<Award className="h-4 w-4" />} title="Certificados">
      <div className="grid gap-3 sm:grid-cols-2">
        {data.certificates.map((cert) => (
          <div
            key={cert.id}
            className="space-y-1 rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm leading-snug font-medium text-foreground">
                {cert.title}
              </h3>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-xs text-primary hover:underline"
                >
                  Ver
                </a>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{cert.issuer}</p>
            {cert.date && (
              <p className="text-[11px] text-muted-foreground">{cert.date}</p>
            )}
            {cert.description && (
              <p className="line-clamp-2 pt-1 text-xs text-muted-foreground">
                {cert.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
