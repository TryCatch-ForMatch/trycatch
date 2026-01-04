'use client';

import { Button } from '@/components/ui/button';
import Title from '@/components/layout/Home/Title';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowDown, Mouse, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const { status } = useSession();

  return (
    <section
      id="hero"
      className="relative flex h-[calc(100vh-100px)] items-center overflow-hidden rounded-2xl bg-linear-to-r from-[#e3f0ff] via-[#f8f5ff] to-[#ffeef5] lg:h-auto xxl:h-[calc(100vh-100px)]"
    >
      {/* Container em coluna única */}
      <div className="max-w-auto mx-auto flex flex-col items-center p-10 md:px-7 md:pt-[88px] lg:flex-row lg:gap-10 lg:py-20 xl:gap-20 xl:px-4 xxl:py-10">
        {/* TEXTO */}
        <div className="text-center">
          <Title />

          <p className="mx-auto mt-8 max-w-[377px] text-[12px] leading-[140%] text-[#5C5C65] sm:text-[14px] md:text-[16px] xl:mt-14">
            Uma rede colaborativa para desenvolvimento de soluções digitais com
            aprendizado prático, mentoria e trabalho em equipe.
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <Link href="/login">
              <Button className="flex h-10 justify-between rounded-[84px] bg-[#35343C] p-[3px] pl-5 hover:bg-[#35343C]/90">
                <span className="text-[14px] font-medium md:text-[16px]">
                  {status === 'unauthenticated'
                    ? 'Faça login'
                    : 'Acesse o Dashboard'}
                </span>
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
                  <ArrowUpRight className="h-5 w-5 text-[#35343C]" />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* IMAGEM — SOMENTE TABLET+ */}
        <div className="mt-12 hidden md:block">
          <Image
            src="https://res.cloudinary.com/daxa1bpny/image/upload/v1764190245/ui_assets/heroBackground_tablet.svg"
            alt="Pessoas colaborando em um projeto"
            width={500}
            height={382}
            priority
            className="lg:w-[400px] xl:w-[600px] xxl:w-[700px]"
          />
        </div>

        {/* INDICADOR DE SCROLL */}
        <div className="absolute bottom-5 flex gap-2 text-[#5C5C65] md:hidden lg:right-10 lg:bottom-10">
          <ArrowDown className="h-4 w-4 md:hidden" />
          <Mouse className="hidden lg:block" />
          <p className="text-[10px] md:text-[11px] lg:text-[14px]">
            rolar para baixo
          </p>
        </div>
      </div>
    </section>
  );
}
