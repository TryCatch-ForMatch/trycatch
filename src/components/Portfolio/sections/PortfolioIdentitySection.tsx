import { Github, Linkedin, Mail } from 'lucide-react';
import type { PortfolioPublicResponse } from '@/types/portfolio.types';
import { Avatar } from '@/components/ui/avatar';

interface PortfolioIdentitySectionProps {
  data: PortfolioPublicResponse;
}

export function PortfolioIdentitySection({
  data,
}: PortfolioIdentitySectionProps) {
  return (
    <section className="flex flex-col items-start gap-6 sm:flex-row">
      <Avatar name={data.name} src={data.avatar} size="lg" />

      <div className="flex-1 space-y-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {data.name}
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            @{data.username}
          </p>
        </div>

        {data.bio && (
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {data.bio}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5" />
              {data.email}
            </a>
          )}
          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
