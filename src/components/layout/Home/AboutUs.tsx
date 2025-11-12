import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

import { Users, ChartNoAxesColumnIncreasing, SquarePen } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="aboutUs" className="mt-20 h-screen w-full px-40">
      {/* Textos */}
      <div className="grid grid-cols-2">
        <div className="justify-self-start text-left">
          <p>Nossa Conexão</p>
        </div>

        <div className="justify-self-end text-right"></div>

        <div className="justify-self-start text-left">
          <div>
            <span className="text-5xl">Sobre nossa rede </span>
          </div>
          <div className="flex">
            <Image
              src="/IconsAboutUs.svg"
              alt="Equipe colaborando em um projeto"
              width={100}
              height={100}
              priority
              className="max-w-none"
            />
            <span className="text-5xl">colaborativa</span>
          </div>
        </div>

        <div className="justify-self-end text-justify">
          <p>
            Conexão entre talentos e projetos de <br /> forma ágil, permitindo
            equipes flexíveis e <br /> produtivas.
          </p>
        </div>
      </div>

      {/* Cards */}

      <div className="mt-20 grid w-full grid-cols-2 gap-4">
        {/* Projetos que ganham equipe */}
        <div className="relative row-span-2 h-104 overflow-hidden rounded-3xl">
          <Image
            src="/BgCardAboutUs.jpg"
            alt="Imagem de fundo do card"
            fill
            priority
            className="object-cover object-center"
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-4">
            {/* ColabWork */}
            <div className="m-2 flex items-center gap-2 self-end rounded-md bg-white/20 px-3 py-1 backdrop-blur-md">
              <Image
                src="/icon_colab.svg"
                alt="ColabWork"
                width={20}
                height={20}
              />
              <span className="text-sm text-white">ColabWork</span>
            </div>

            {/* Rodapé */}
            <div className="mb-2 flex h-25 w-90 items-center justify-center self-center rounded-md bg-white/20 px-4 py-2 backdrop-blur-md">
              <h4 className="text-[36px] font-medium text-white">
                Projetos que ganham equipe
              </h4>

              <div className="rounded-full bg-white p-2">
                <Users className="text-[#3B38A0]" />
              </div>
            </div>
          </div>
        </div>

        {/* Conecte talentos certos */}
        <div className="row-span-1 h-50 rounded-3xl bg-[#EAEAF2] p-5">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <p className="mb-7 text-[36px] font-medium text-[#3B38A0]">
                Conecte talentos certos
              </p>
            </div>

            <div className="flex h-15 w-100 flex-row items-center justify-between self-center rounded-3xl bg-white px-5">
              <div>
                <p className="text-gray-500">Equipe sob medida</p>
              </div>
              <ChartNoAxesColumnIncreasing className="h-10 w-10 text-[#3B38A0]" />
            </div>
          </div>
        </div>

        {/* Da ideia até a entrega final */}
        <div className="row-span flex h-50 items-end justify-between rounded-3xl bg-[#D9D9ED] p-10">
          <div>
            <p className="text-[36px] leading-9 font-medium text-[#3B38A0]">
              Da ideia até a <br />
              entrega final
            </p>
          </div>

          <div>
            <SquarePen className="h-10 w-10 text-[#3B38A0]" />
          </div>
        </div>

        {/* Nossa proposta */}
        <div className="col-span-2 mb-10 flex items-end justify-between overflow-hidden rounded-3xl bg-[#A1A0D1]">
          <div className="p-10">
            <p className="font-regular mb-2 text-[14px] text-white">
              Nossa proposta
            </p>
            <p className="mb-5 text-[36px] leading-9 font-medium text-white">
              Uma rede simples <br /> para unir pessoas e projetos
            </p>
            <p className="text-[16px] leading-4 font-medium text-white">
              Criamos uma comunidade onde desenvolvedores, designers e QA se{' '}
              <br />
              conectam com empresas ou pessoas que precisam de soluções.
            </p>
          </div>

          <div className="">
            <Image
              src="/iconNossaProposta.svg"
              alt="ColabWork"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
