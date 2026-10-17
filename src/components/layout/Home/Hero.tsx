import Title from '@/components/layout/Home/Title';
import HeroCta from '@/components/layout/Home/HeroCta';
import Image from 'next/image';
import { ArrowDown, Mouse } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-[calc(100vh-100px)] items-center overflow-hidden rounded-2xl bg-linear-to-r from-[#e3f0ff] via-[#f8f5ff] to-[#ffeef5] md:h-auto"
    >
      <div className="max-w-auto mx-auto flex flex-col items-center p-10 md:my-4 md:px-7 lg:flex-row lg:items-end lg:gap-10 lg:pt-10 lg:pb-0 xl:gap-20 xl:px-4 xxl:lg:pt-20">
        <div className="pb-8 text-center lg:text-left">
          <Title />

          <p className="mx-auto mt-8 max-w-[377px] text-[12px] leading-[140%] text-gray-300 sm:text-[14px] md:text-[16px] lg:mx-0 xl:mt-14 xxl:max-w-[600px] xxl:text-[25px]">
            Uma rede colaborativa para desenvolvimento de soluções digitais com
            aprendizado prático, mentoria e trabalho em equipe.
          </p>

          <div className="mt-8 flex justify-center lg:justify-normal">
            <HeroCta />
          </div>
        </div>

        <div className="mt-12 hidden lg:block">
          <Image
            src="https://res.cloudinary.com/daxa1bpny/image/upload/v1764190245/ui_assets/heroBackground_tablet.svg"
            alt="Pessoas colaborando em um projeto"
            width={500}
            height={382}
            priority
            className="xl:w-[600px] xxl:w-[700px]"
          />
        </div>

        <div className="absolute bottom-5 flex gap-2 text-gray-300 md:hidden lg:right-10 lg:bottom-10">
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
