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
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground border border-border/50">
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
      className="rounded w-[18px] h-[18px] sm:w-5 sm:h-5"
      onError={() => setErrored(true)}
    />
  );
}
