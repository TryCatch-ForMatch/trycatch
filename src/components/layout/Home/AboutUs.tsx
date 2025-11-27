import Image from 'next/image';
import { Users, ChartNoAxesColumnIncreasing, SquarePen } from 'lucide-react';

export default function AboutUs() {
  return (
    <section
      id="aboutUs"
      className="mt-16 md:mt-[125px] lg:mt-[132px] xl:mt-36 xxl:mt-[200px]"
    >
      <div className="h-44 bg-green-700">AboutUs</div>
    </section>
  );
}
{
  /*  
        <div>
          <p className="mb-4 text-[12px] font-medium md:text-[14px]">
            Nossa Conexão
          </p>

          <h2 className="mb-[18px] text-[26px] leading-tight md:text-[44px]">
            Sobre nossa rede
            <span className="flex items-center">
              <Image
                src="https://res.cloudinary.com/daxa1bpny/image/upload/v1763427512/ui_assets/IconsAboutUs.svg"
                alt="Equipe colaborando"
                width={66}
                height={29}
                priority
                className="mr-2"
              />
              colaborativa
            </span>
          </h2>

          <p className="md:hidden">
            Conexão entre talentos e projetos de forma ágil, permitindo equipes
            flexíveis e produtivas.
          </p>

          <p className="hidden md:block md:text-[16px]">
            Conexão entre talentos e projetos de forma ágil, permitindo <br />
            equipes flexíveis e produtivas.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:auto-rows-fr lg:grid-cols-2">

          <div className="lg:row-span-2">
            <div className="relative mt-10 mb-4 h-56 w-[335px] overflow-hidden rounded-3xl md:mt-16 md:h-[224px] md:w-[754px] lg:h-[382px] lg:w-full">
              <Image
                src="https://res.cloudinary.com/daxa1bpny/image/upload/v1763427408/ui_assets/BgCardAboutUs.jpg"
                alt="Imagem de fundo"
                fill
                priority
                className="object-cover"
              />

              <div className="relative z-10 flex h-full flex-col justify-between p-4">
                <div className="m-2 flex items-center gap-2 self-end rounded-md bg-white/20 px-3 py-1 backdrop-blur-xl">
                  <Image
                    src="https://res.cloudinary.com/daxa1bpny/image/upload/v1763427446/ui_assets/icon_colab.svg"
                    alt="ColabWork"
                    width={18}
                    height={18}
                  />
                  <p className="text-[16px] font-medium text-white">
                    ColabWork
                  </p>
                </div>

                <div className="mb-2 flex h-[82px] w-[289px] items-center justify-center self-center rounded-md bg-white/20 px-4 py-2 backdrop-blur-xl md:h-[98px] md:w-[393px] md:justify-between">
                  <h3 className="text-[24px] font-medium text-white md:hidden">
                    Projetos que ganham equipe
                  </h3>

                  <h3 className="hidden text-[32px] leading-tight font-medium text-white md:block">
                    Projetos que <br /> ganham equipe
                  </h3>

                  <div className="hidden h-[39px] w-[39px] rounded-full bg-white p-2 md:flex">
                    <Users className="h-5 text-primary-default" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:mt-0 lg:auto-rows-fr lg:grid-cols-1">
            <div className="h-auto rounded-3xl bg-[#EAEAF2] p-5 md:h-[187px]">
              <div className="flex flex-col items-center text-center">
                <p className="mb-5 text-[24px] leading-tight font-medium text-primary-default md:text-[32px]">
                  Conecte talentos certos
                </p>

                <div className="flex h-[52px] w-[295px] items-center justify-between rounded-[14px] bg-white px-[17px] py-[11px] md:w-[323px]">
                  <p className="text-gray-500">Equipe sob medida</p>
                  <ChartNoAxesColumnIncreasing className="h-[29px] w-[29px] text-[#3B38A0]" />
                </div>
              </div>
            </div>

            <div className="flex h-auto items-end justify-between rounded-3xl bg-[#D9D9ED] p-5 md:h-[187px]">
              <p className="text-[24px] leading-6 font-medium text-[#3B38A0] md:text-[26px]">
                Da ideia até a <br />
                entrega final
              </p>
              <SquarePen className="h-[29px] w-[29px] text-[#3B38A0]" />
            </div>
          </div>
        </div>


        <div className="mt-8">
          <div className="grid h-[455px] w-full overflow-hidden rounded-3xl bg-[#A1A0D1] md:h-[256px] md:grid-cols-2">
            <div className="flex w-full flex-col justify-center p-7 md:ml-9 md:p-0">
              <p className="mb-[9px] text-[12px] font-medium text-white">
                Nossa proposta
              </p>

              <h3 className="mb-[9px] text-[24px] leading-tight font-medium text-white md:text-[32px]">
                Uma rede simples para unir pessoas e projetos
              </h3>

              <p className="mt-[11px] text-[14px] leading-[140%] text-white">
                Criamos uma comunidade onde desenvolvedores, designers e QA se
                conectam com empresas ou pessoas que precisam de soluções.
              </p>
            </div>

            <div className="flex items-end justify-end md:hidden">
              <Image
                src="/iconNossaProposta_sm.svg"
                alt="ColabWork"
                width={300}
                height={300}
              />
            </div>

            <div className="hidden items-end justify-end md:flex">
              <Image
                src="/iconNossaProposta.svg"
                alt="ColabWork"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
      */
}
