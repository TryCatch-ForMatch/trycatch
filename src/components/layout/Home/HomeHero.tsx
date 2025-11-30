'use client';

import { Button } from '@/components/ui/button';
import Title from '@/components/layout/Home/Title';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowDown, ArrowUpRight, Mouse } from 'lucide-react';

export default function HomeHero() {
  const { status } = useSession();

  return (
    <section
      id="hero"
      className="relative h-[calc(100dvh-68px)] overflow-x-hidden rounded-2xl bg-linear-to-r from-[#e3f0ff] via-[#f8f5ff] to-[#ffeef5] xl:h-[calc(100dvh-88px)] xl:rounded-4xl xxl:h-[calc(100dvh-98px)]"
    >
      <div className="grid w-full grid-cols-4 justify-items-center p-10 md:grid-cols-6">
        {/* Titulo */}
        <div className="col-span-4 mt-[180px] md:col-span-6 xxl:mt-16">
          <Title />
        </div>

        {/* Paragrafo */}
        <p className="col-span-4 mt-[30px] text-center text-[14px] md:col-start-2 md:col-end-6 md:mt-[33px] md:text-center md:text-[16px] lg:absolute lg:top-[85%] lg:right-[66%] lg:px-10 lg:text-justify xl:top-[87%] xxl:text-[18px]">
          Uma rede colaborativa onde talentos se unem a desafios para criar
          grandes projetos.
        </p>
        {/* CTA */}
        <Link
          href="./login"
          className="col-span-4 mt-[26px] justify-self-center md:col-span-6"
        >
          <Button className="h-10 rounded-full bg-[#35343C] py-5 pr-1 pl-6 text-lg shadow-md hover:bg-[#35343C]/90 xl:h-12">
            <p className="mr-3 font-medium">
              {status === 'unauthenticated'
                ? 'Faça login'
                : 'Acesse o Dashboard'}
            </p>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black xl:h-10 xl:w-10">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Button>
        </Link>
        {/* lembrete */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 md:hidden lg:right-6 lg:bottom-10 lg:left-auto lg:flex lg:translate-x-0 lg:px-10">
          <ArrowDown className="md:hidden" />
          <Mouse className="hidden lg:flex" />

          <p className="">rolar para baixo</p>
        </div>

        {/* imagem */}
        {/* tablet */}
        <div className="hidden md:block lg:hidden">
          <Image
            src="https://res.cloudinary.com/daxa1bpny/image/upload/v1764190245/ui_assets/heroBackground_tablet.svg"
            alt="Pessoas trabalhando"
            width={631}
            height={428}
            className="absolute bottom-0 left-[10%]"
          />
        </div>
        {/* desktop */}
        <div className="hidden lg:block">
          <Image
            src="https://res.cloudinary.com/daxa1bpny/image/upload/v1764194343/ui_assets/heroBackground_lg.svg"
            alt="Pessoas trabalhando"
            width={631}
            height={428}
            className="absolute bottom-0 left-[20%] lg:left-[15%] lg:h-[381px] lg:w-[848px] xl:left-[21%] xxl:w-[1145px] xxl:lg:h-[515px]"
          />
        </div>
      </div>
    </section>
  );
}
