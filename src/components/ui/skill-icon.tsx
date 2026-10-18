'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface SkillIconProps {
  src: string;
  name: string;
}

export function SkillIcon({ src, name }: SkillIconProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <Badge
        variant="secondary"
        className="rounded-full border-border/50 font-normal"
      >
        {name}
      </Badge>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={18}
      height={18}
      className="h-[18px] w-[18px] rounded sm:h-5 sm:w-5"
      onError={() => setErrored(true)}
    />
  );
}
