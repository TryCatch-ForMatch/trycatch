'use client';

import Image from 'next/image';

type Props = {
  title?: string
}

export default function UnderDevelopment({ title = '' }: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center gap-3">
      <span className="text-5xl text-gray-600" >{title}</span>
      <Image
        src="/under-construction.png"
        alt="Página em desenvolvimento"
        width={600}
        height={300}
        className="h-auto max-w-full"
        priority
      />
      <p className="mt-2 max-w-md text-gray-600">
        Essa pági