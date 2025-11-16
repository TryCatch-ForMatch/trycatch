'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowDown, ArrowUpRight, Mouse } from 'lucide-react';

export default function HomeHero() {
  const { status } = useSession();

  return (
    <section id="hero">
      {/* Mobile  */}
      <div className="flex h-[calc(100dvh-68px)] flex-col items-center justify-center rounded-3xl bg-[url('/heroBackground_mobile.svg')] md:hidden">
        <h1 className="mb-3 p-5 text-center text-[38px] leading-[120%] font-semibold">
          <span className="relative">
            Conectando
            <Image
              src="/shineIcon.svg"
              alt="icone de estrela"
              width={30}
              height={30}
              className="absolute right-58 bottom-7"
            />
          </span>
          talentos a projetos reais <br />
          <span className="relative">
            juntos
            <Image
              src="/star.svg"
              alt="icone de estrela"
              width={20}
              height={20}
              className="absolute top-0 left-32"
            />
            <Image
              src="/stroke.svg"
              alt="icone de estrela"
              width={100}
              height={100}
              className="absolute top-12 left-3"
            />
          </span>
        </h1>
        <p className="text-center">
          Uma rede colaborativa onde talentos <br /> se unem a desafios para
          criar <br /> grandes projetos.
        </p>
        <div className="mt-6">
          <Link href="./login">
            <Button className="rounded-full bg-[#35343C] py-5 pr-1 pl-6 text-lg shadow-md hover:bg-[#35343C]/90">
              <p className="mr-3 font-medium">
                {status === 'unauthenticated'
                  ? 'Faça login'
                  : 'Acesse o Dashboard'}
              </p>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 md:hidden lg:hidden">
          <ArrowDown />
          <p>rolar para baixo</p>
        </div>
      </div>

      {/* tablet */}
      <div className="h-[calc(100dvh-68px)] flex-col items-center rounded-3xl bg-[url('/heroBackground_tablet.svg')] bg-no-repeat sm:hidden md:flex lg:hidden">
        <div className="mt-30 flex flex-col items-center">
          <h1 className="p-5 text-center text-[48px] font-semibold">
            <span className="relative">
              Conectando
              <Image
                src="/shineIcon.svg"
                alt="icone de estrela"
                width={60}
                height={60}
                className="absolute right-72 bottom-7"
              />
            </span>{' '}
            talentos a <br /> projetos reais
            <span className="relative ml-4">
              juntos
              <Image
                src="/star.svg"
                alt="icone de estrela"
                width={20}
                height={20}
                className="absolute top-3 left-39"
              />
              <Image
                src="/stroke.svg"
                alt="icone de estrela"
                width={120}
                height={120}
                className="absolute top-14 left-3"
              />
            </span>
          </h1>
          <p className="text-center">
            Uma rede colaborativa onde talentos se unem <br /> a desafios para
            criar grandes projetos.
          </p>
          <div className="mt-6">
            <Link href="./login">
              <Button className="rounded-full bg-[#35343C] py-5 pr-1 pl-6 text-lg shadow-md hover:bg-[#35343C]/90">
                <p className="mr-3 font-medium">
                  {status === 'unauthenticated'
                    ? 'Faça login'
                    : 'Acesse o Dashboard'}
                </p>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Button>
            </Link>
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 md:hidden lg:hidden">
            <ArrowDown />
            <p>rolar para baixo</p>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="relative flex-col items-center rounded-3xl bg-no-repeat sm:hidden md:hidden lg:flex lg:h-[calc(100dvh-80px)] lg:bg-[url('/heroBackground_lg.svg')] xl:h-[calc(100dvh-88px)] xl:bg-[url('/heroBackground_xl.svg')] xxl:h-[calc(100dvh-98px)] xxl:bg-[url('/heroBackground_xxl.svg')]">
        <div className="mt-20 flex flex-col items-center">
          <h1 className="p-5 text-center text-[48px] leading-[120%] font-semibold xxl:text-[72px]">
            <span className="relative">
              Conectando
              <div className="absolute right-74 bottom-9 h-[43px] w-[44px] xl:h-[51px] xl:w-[52px] xxl:right-110 xxl:bottom-13">
                <Image
                  src="/shineIcon.svg"
                  alt="brilho decorativo"
                  fill
                  className="object-contain"
                />
              </div>
            </span>
            talentos a <br /> projetos reais
            <span className="relative ml-4 inline-block">
              juntos
              <div className="absolute top-0 left-39 h-[21px] w-[21px] xl:h-[25px] xl:w-[25px] xxl:top-2 xxl:left-57">
                <Image
                  src="/star.svg"
                  alt="estrela decorativa"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute top-13 left-3 h-[16px] w-[116px] xl:h-[19px] xl:w-[135px] xxl:top-20 xxl:left-5 xxl:h-[25px] xxl:w-[182px]">
                <Image
                  src="/stroke.svg"
                  alt="stroke decorativo"
                  fill
                  className="object-contain"
                />
              </div>
            </span>
          </h1>

          <div className="mt-6">
            <Link href="./login">
              <Button
                className={
                  status === 'unauthenticated'
                    ? 'rounded-full bg-[#35343C] py-5 pr-1 pl-6 font-medium shadow-md hover:bg-[#35343C]/90 xl:h-[48px] xl:font-[18px] lg:xl:w-[178px]'
                    : 'rounded-full bg-[#35343C] py-5 pr-1 pl-6 font-medium shadow-md hover:bg-[#35343C]/90 xl:h-[48px] xl:font-[18px] lg:xl:w-[280px]'
                }
              >
                <p className="mr-3 font-medium">
                  {status === 'unauthenticated'
                    ? 'Faça login'
                    : 'Acesse o Dashboard'}
                </p>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black lg:h-[34px] lg:w-[34px] xxl:h-[40px] xxl:w-[40px]">
                  <ArrowUpRight className="xxl:!h-8 xxl:!w-8" />
                </span>
              </Button>
            </Link>
          </div>

          <div className="absolute top-134 w-full p-10 xxl:top-180">
            <div className="flex w-full items-center justify-between">
              {/* lg */}
              <p className="text-left lg:block lg:text-[16px] xl:hidden xxl:hidden">
                Uma rede colaborativa onde talentos <br /> se unem a desafios
                para criar grandes <br /> projetos.
              </p>
              {/* xl */}
              <p className="text-left lg:hidden xl:block xl:text-[16px] xxl:hidden">
                Uma rede colaborativa onde talentos <br /> se unem a desafios
                para criar grandes projetos.
              </p>
              {/* xxl */}
              <p className="text-left lg:hidden xl:hidden xxl:block">
                Uma rede colaborativa onde talentos <br /> se unem a desafios
                para criar grandes projetos.
              </p>

              <p className="flex text-right lg:text-[16px]">
                <Mouse className="mr-2" />
                rolar para baixo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /*<section className="relative flex w-full flex-col items-center rounded-3xl bg-gradient-to-r from-[#e3f0ff] via-[#f8f5ff] to-[#ffeef5] p-6">

      


      <p className="mt-4 block text-center text-[15px] leading-relaxed lg:hidden">
        Uma rede colaborativa onde talentos <br />
        se unem a desafios para criar grandes projetos.
      </p>


      <div className="mt-6">
        <Link href="./login">
          <Button className="rounded-full bg-[#35343C] py-5 pr-1 pl-6 text-lg shadow-md hover:bg-[#35343C]/90">
            <span className="mr-3">
              {status === 'unauthenticated'
                ? 'Faça login'
                : 'Acesse o Dashboard'}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Button>
        </Link>
      </div>


      <div className="mt-10 hidden w-full items-end justify-center md:flex lg:hidden">
        <Image
          src="/heroBackground_md.svg"
          alt="Equipe colaborando em um projeto"
          width={650}
          height={650}
          priority
          className="h-auto w-full max-w-[650px]"
        />
      </div>

      <div className="mt-12 hidden w-full grid-cols-3 items-end gap-10 px-8 lg:grid">

        <div className="flex items-end justify-center">
          <p className="max-w-[300px] text-center text-[16px] leading-relaxed">
            Uma rede colaborativa onde talentos <br />
            se unem a desafios para criar grandes projetos.
          </p>
        </div>

        <div className="flex items-end justify-center">
          <Image
            src="/heroBackground_md.svg"
            alt="Equipe colaborando em um projeto"
            width={900}
            height={900}
            priority
            className="h-auto w-full max-w-[750px]"
          />
        </div>

        <div className="flex flex-col items-center justify-end gap-2">
          <Mouse className="mb-2" />
          <p>rolar para baixo</p>
        </div>
      </div>

  
      
    </section>
 */
}
