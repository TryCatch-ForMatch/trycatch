'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PublicPortfolio } from '@/types/portfolio/public-portfolio';

interface PortfolioFeedbackSectionProps {
  data: PublicPortfolio;
}

export function PortfolioFeedbackSection({
  data,
}: PortfolioFeedbackSectionProps) {
  if (!data.feedbacks || data.feedbacks.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h2 className="mb-6 text-2xl font-semibold text-[#101014]">Feedback</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {data.feedbacks.map((feedback, index) => (
          <Card
            key={index}
            className="rounded-2xl border border-[#EAEAEB] shadow-sm transition hover:shadow-md"
          >
            <CardContent className="flex items-start gap-4 p-5">
              <Image
                src={feedback.fromUser.avatar || '/placeholder.png'}
                alt={feedback.fromUser.name}
                width={40}
                height={40}
                className="rounded-full"
              />

              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-[#101014]">
                  {feedback.fromUser.name}
                </p>

                <p className="text-xs text-[#A6A6AA]">
                  Nota: {feedback.rating}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
