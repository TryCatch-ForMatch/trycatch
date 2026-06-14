'use client';

import Image from 'next/image';

type Props = {
  title?: string;
};

export default function UnderDevelopment({ title = '' }: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 p-6 text-center">
      <span className="text-5xl text-gray-600">{title}</span>
      <Image
        src="/under-construction.png"
        alt="Página em desenvolvimento"
        width={600}
        height={300}
        className="h-auto max-w-full"
        priority
      />
      <p className="mt-2 max-w-md text-gray-600">
        Essa página ainda está em desenvolvimento. Em breve você poderá acessar
        essa funcionalidade!
      </p>
    </div>
  );
}
