'use client';

import { Button } from '@/components/ui/button';
import Title from '@/components/layout/Home/Title';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowDown, ArrowUpRight, Mouse } from 'lucide-react';

export default function Hero() {
  const { status } = useSession();

  return (
    <>
      <section
        id="hero"
        className="relative h-[calc(100dvh-68px)] overflow-x-hidden rounded-2xl bg-linear-to-r from-[#e3f0ff] via-[#f8f5ff] to-[#ffeef5] lg:hidden"
      >
        <div className="grid w-full grid-cols-4 justify-items-center md:grid-cols-6 lg:grid-cols-12">
          {/* Titulo */}
          <div className="col-span-4 mt-32 md:col-span-6 md:mt-[88px]">
            <Title />
          </div>

          {/* Paragrafo sm & md */}
          <p className="col-span-4 mt-[27px] w-[265px] text-center text-[14px] leading-[140%] md:col-start-2 md:col-end-6 md:mt-[34px] md:text-[16px] lg:hidden">
            Uma rede colaborativa onde talentos se unem a desafios para criar
            grandes projetos.
          </p>
          {/* CTA */}
          <Link
            href="./login"
            className="col-start-2 col-end-4 mt-[26px] grid md:col-span-6 lg:col-start-6 lg:col-end-8"
          >
            <Button className="flex h-10 justify-between rounded-[84px] bg-[#35343C] p-[3px] pl-5 hover:bg-[#35343C]/90">
              <p className="text-[14px] font-medium md:text-[16px]">
                {status === 'unauthenticated'
                  ? 'Faça login'
                  : 'Acesse o Dashboard'}
              </p>
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[84px] bg-white">
                <ArrowUpRight className="h-5 w-5 text-[#35343C]" />
              </span>
            </Button>
          </Link>
          {/* lembrete sm & md */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 md:hidden">
            <ArrowDown className="md:hidden" />
            <p className="text-[14px] leading-[140%] text-[#5C5C65]">
              rolar para baixo
            </p>
          </div>

          {/* imagem md */}
          <div className="col-span-6 hidden md:grid lg:hidden">
            <Image
              src="https://res.cloudinary.com/daxa1bpny/image/upload/v1764190245/ui_assets/heroBackground_tablet.svg"
              alt="Pessoas trabalhando"
              width={631}
              height={428}
              className=""
            />
          </div>

          {/* lg+ */}
          <div className="hidden items-end">
            {/* Paragrafo lg */}
            <p className="text-left text-[16px] leading-[140%]">
              Uma rede colaborativa onde talentos se <br /> unem a desafios para
              criar grandes <br /> projetos.
            </p>
            {/* Paragrafo xl+ */}
            <p className="absolute mb-10 ml-10 text-left text-[16px] leading-[140%] lg:hidden xl:block">
              Uma rede colaborativa onde talentos se unem a desafios para criar
              grandes projetos.
            </p>

            <Image
              src="https://res.cloudinary.com/daxa1bpny/image/upload/v1764194343/ui_assets/heroBackground_lg.svg"
              alt="Pessoas trabalhando"
              width={771}
              height={347}
              className="col-start-3 col-end-11"
            />

            {/* lembrete lg+ */}
            <div className="col-start-11 col-end-13 mb-10 flex items-end">
              <Mouse className="" />
              <p className="">rolar para baixo</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
