'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowDown, ArrowUpRight, Mouse } from 'lucide-react';

export default function HomeHero() {
  const { status } = useSession();

  return (
    <div>
      {/* MOBILE */}
      <h1 className="text-center text-[32px] leading-[120%] font-semibold md:hidden">
        {/* Linha 1 */}
        <div className="relative inline-block">
          Conectando
          <Image
            src="/shineIcon.svg"
            alt="icone de estrela"
            width={27}
            height={26}
            className="absolute right-[96%] bottom-[60%]"
          />
        </div>

        <br />

        {/* Linha 2 */}
        <div className="relative inline-block">
          talentos a <br /> projetos reais
        </div>

        <br />

        {/* Linha 3 */}
        <div className="relative inline-block">
          juntos
          <Image
            src="/star.svg"
            alt="icone de estrela"
            width={21}
            height={21}
            className="absolute bottom-[60%] left-full"
          />
          <Image
            src="/stroke.svg"
            alt="icone de stroke"
            width={97}
            height={13}
            className="absolute left-[10%]"
          />
        </div>
      </h1>

      {/* TABLET */}
      <h1 className="hidden text-center text-[40px] leading-[120%] font-semibold md:block lg:text-[48px] xl:text-[56px] xxl:lg:text-[72px]">
        {/* Aqui você define o layout EXATAMENTE como no Figma */}

        {/* Linha 1 */}
        <div className="relative inline-block">
          Conectando talentos a
          <Image
            src="/shineIcon.svg"
            alt="icone de estrela"
            width={44}
            height={43}
            className="absolute right-[98%] bottom-[52%] xl:h-[52px]! xl:w-[51px]!"
          />
        </div>

        <br />

        {/* Linha 2 — no tablet você disse que é diferente */}
        <div className="relative inline-block">
          projetos reais juntos
          <Image
            src="/star.svg"
            alt="icone de estrela"
            width={21}
            height={21}
            className="absolute bottom-[60%] left-full xxl:h-[25px]! xxl:w-[25px]!"
          />
          <Image
            src="/stroke.svg"
            alt="icone de stroke"
            width={116}
            height={16}
            className="absolute left-[72%] xl:w-[135px]! xxl:h-[25px]! xxl:w-[182px]!"
          />
        </div>
      </h1>
    </div>
  );
}
