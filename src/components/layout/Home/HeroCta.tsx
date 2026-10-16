'use client';

import Link from 'next/link';
import { SessionProvider, useSession } from 'next-auth/react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function HeroCtaLink() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const ctaHref = isAuthenticated ? '/dashboard' : '/how-to-join';
  const ctaLabel = isAuthenticated ? 'Acesse o Dashboard' : 'Começar';

  return (
    <Button
      asChild
      className="flex h-10 justify-between rounded-[84px] bg-[#35343C] p-[3px] pl-5 hover:bg-[#35343C]/90 xxl:h-16 xxl:w-auto xxl:pr-2"
    >
      <Link href={ctaHref}>
        <span className="text-[14px] font-medium md:text-[16px] lg:pr-2 xxl:text-[20px]">
          {ctaLabel}
        </span>
        <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white xxl:h-[50px] xxl:w-[50px]">
          <ArrowUpRight
            aria-hidden
            className="h-5 w-5 text-[#35343C] xxl:h-7! xxl:w-7!"
          />
        </span>
      </Link>
    </Button>
  );
}

export default function HeroCta() {
  return (
    <SessionProvider>
      <HeroCtaLink />
    </SessionProvider>
  );
}
