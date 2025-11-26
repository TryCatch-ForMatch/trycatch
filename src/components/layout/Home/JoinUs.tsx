'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';

export default function JoinUs() {
  return (
    <section className="mt-[65px] md:mt-[113px] lg:mt-[121px] xl:mt-[136px] xxl:mt-[201px]">
      <div className="bg-green-700">joinUs</div>
    </section>
  );
}

{
  /* <div className="flex h-64 w-full rounded-3xl bg-linear-to-r from-[#D5EEFF]/10 to-[#FFE6EC]/10">
        <div className="mr-10 p-10">
          <h2 className="mb-5 text-4xl">Participe da nossa rede agora</h2>
          <p className="mb-5">
            Cadastre seu projeto ou junte-se à comunidade e colabore em novas
            ideias.
          </p>
          <Button className="rounded-full bg-[#35343C] py-5 pr-1 pl-6 text-lg shadow-md transition hover:bg-[#35343C]/90">
            <span className="mr-3">Começar agora</span>
          </Button>
        </div>

        <div>
          <Image
            src="/Icon_aboutUs.svg"
            alt="ColabWork"
            width={300}
            height={300}
          />
        </div>
      </div> */
}
