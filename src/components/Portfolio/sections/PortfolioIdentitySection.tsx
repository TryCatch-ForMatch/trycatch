'use client';

import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicPortfolio } from '@/types/portfolio/public-portfolio';

interface PortfolioIdentitySectionProps {
  data: PublicPortfolio;
}

export function PortfolioIdentitySection({
  data,
}: PortfolioIdentitySectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        {/* Avatar */}
        <div className="relative">
          <Image
            src={data.avatar || '/placeholder.png'}
            alt={data.name}
            width={160}
            height={160}
            className="rounded-full border-4 border-[#D9D9ED] object-cover"
          />
        </div>

        {/* Informações */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-semibold text-[#101014] sm:text-4xl">
            {data.name}
          </h1>

          {data.bio && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5C5C65]">
              {data.bio}
            </p>
          )}

          {/* Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
            {data.github && (
              <Button asChild variant="secondary" className="gap-2 rounded-xl">
                <a href={data.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            )}

            {data.linkedin && (
              <Button asChild variant="secondary" className="gap-2 rounded-xl">
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
