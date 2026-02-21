'use client';

import { Card, CardContent } from '@/components/ui/card';
import { PublicPortfolio } from '@/types/portfolio/public-portfolio';

interface PortfolioCertificatesSectionProps {
  data: PublicPortfolio;
}

export function PortfolioCertificatesSection({
  data,
}: PortfolioCertificatesSectionProps) {
  if (!data.certificates || data.certificates.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h2 className="mb-6 text-2xl font-semibold text-[#101014]">
        Certificados
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {data.certificates.map((cert) => (
          <Card
            key={cert.id}
            className="rounded-2xl border border-[#EAEAEB] shadow-sm transition hover:shadow-md"
          >
            <CardContent className="space-y-2 p-5">
              <h3 className="text-base font-semibold text-[#101014]">
                {cert.title}
              </h3>

              <p className="text-sm text-[#5C5C65]">{cert.issuer}</p>

              <p className="text-xs text-[#A6A6AA]">{cert.date}</p>

              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block pt-2 text-sm font-medium text-[#3B38A0] hover:underline"
                >
                  Ver certificado
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
