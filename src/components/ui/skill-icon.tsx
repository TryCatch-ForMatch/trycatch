'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SkillIconProps {
  src: string;
  name: string;
}

export function SkillIcon({ src, name }: SkillIconProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <span className="inline-flex items-center rounded-full border border-border/50 bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
        {name}
      </span>
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
