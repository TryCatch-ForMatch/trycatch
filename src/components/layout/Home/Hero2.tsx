'use client';

import { Button } from '@/components/ui/button';
import Title from '@/components/layout/Home/Title';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowDown, ArrowUpRight, Mouse } from 'lucide-react';

export default function Hero2() {
  const { status } = useSession();
  //
  return (
    <>
      <section
        id="hero"
        className="relative hidden overflow-hidden rounded-2xl bg-linear-to-r from-[#e3f0ff] via-[#f8f5ff] to-[#ffeef5] lg:block"
      >
        <div className="relative grid h-full grid-cols-12">
          {/* TÍTULO */}
          <div className="col-start-3 col-end-11 mt-[72px] self-end text-center">
            <Title />
          </div>

          {/* CTA */}
          <div className="col-start-5 col-end-9 mt-8 flex justify-center">
            <Link href="./login">
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
          </div>

          {/* LINHA INFERIOR — texto esquerda + imagem + rolar */}
          {/* TEXTO ESQUERDA */}
          <p className="absolute col-start-1 col-end-5 mb-10 ml-10 self-end text-left text-[16px] leading-[140%] xl:hidden">
            Uma rede colaborativa onde talentos <br /> se unem a desafios para
            criar grandes <br /> projetos.
          </p>

          <p className="absolute col-start-1 col-end-5 mb-10 ml-10 hidden self-end text-left text-[16px] leading-[140%] xl:block">
            Uma rede colaborativa onde talentos <br /> se unem a desafios para
            criar grandes projetos.
          </p>

          {/* IMAGEM CENTRAL */}
          <div className="col-start-3 col-end-11 mt-[42px] flex justify-center self-end">
            <Image
              src="https://res.cloudinary.com/daxa1bpny/image/upload/v1764194343/ui_assets/heroBackground_xl.svg"
              alt="Pessoas trabalhando"
              width={771}
              height={347}
              className="xl:h-[382px]! xl:w-[848px]! xxl:h-[382px]! xxl:w-[1145px]!"
            />
          </div>

          {/* ROLAR DIREITA */}
          <div className="absolute col-start-11 col-end-13 mb-10 flex items-end justify-end self-end">
            <Mouse />
            <p className="ml-2">rolar para baixo</p>
          </div>
        </div>
      </section>
    </>
  );
}
