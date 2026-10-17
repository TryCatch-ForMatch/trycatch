import { MessageSquareQuote } from 'lucide-react';
import type { PortfolioPublicResponse } from '@/types/portfolio.types';
import { Section } from '@/components/ui/section';

interface PortfolioFeedbackSectionProps {
  data: PortfolioPublicResponse;
}

/**
 * Camada B do sistema de feedback: texto de desenvolvimento publicado pelo
 * próprio avaliado.
 *
 * As estrelas foram removidas por decisão de produto (seção 5.4 — antipadrões
 * visuais proibidos): nota e escala transformam a página em ranking, e o
 * documento é explícito em que a camada pública não comunica quantidade nem
 * teto. Aqui o texto vale por si.
 *
 * A autoria não é exibida: o anonimato público deixou de ser escolha do
 * avaliador e passou a ser regra fixa (seção 7).
 */
export function PortfolioFeedbackSection({
  data,
}: PortfolioFeedbackSectionProps) {
  const comentarios = (data.feedback ?? []).filter((fb) => fb.comment);

  if (comentarios.length === 0) return null;

  return (
    <Section
      icon={<MessageSquareQuote className="h-4 w-4" />}
      title="Feedback recebido"
    >
      <div className="space-y-3">
        {comentarios.map((fb) => (
          <figure
            key={fb.id}
            className="space-y-2 rounded-lg border border-border bg-card p-4"
          >
            <blockquote className="text-sm leading-relaxed text-muted-foreground">
              &quot;{fb.comment}&quot;
            </blockquote>
            <figcaption className="text-xs text-muted-foreground">
              {fb.projectName}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
