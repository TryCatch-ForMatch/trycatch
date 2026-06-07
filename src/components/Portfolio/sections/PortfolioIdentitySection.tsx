import { Github, Linkedin, Mail } from 'lucide-react';
import type { PortfolioPublicResponse } from '@/types/portfolio.types';
import { Avatar } from '@/components/ui/avatar';

interface PortfolioIdentitySectionProps {
  data: PortfolioPublicResponse;
}

export function PortfolioIdentitySection({ data }: PortfolioIdentitySectionProps) {
  return (
    <section className="flex flex-col sm:flex-row gap-6 items-start">
      <Avatar name={data.name} src={data.avatar} size="lg" />

      <div className="flex-1 space-y-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {data.name}
          </h1>
          <p className="text-sm text-muted-foreground font-mono">@{data.username}</p>
        </div>

        {data.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
            {data.bio}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              {data.email}
            </a>
          )}
          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
