import Image from 'next/image';
import { Users, ChartNoAxesColumnIncreasing, SquarePen } from 'lucide-react';

export default function AboutUs() {
  return (
    <section
      id="aboutUs"
      className="mt-16 md:mt-[125px] lg:mt-[132px] xl:mt-36 xxl:mt-[200px]"
    >
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:grid-rows-2">
        <p className="flex items-end text-[12px] lg:col-start-2 lg:col-end-7 lg:row-start-1 lg:text-[16px] xxl:text-[18px]">
          Nossa Conexão
        </p>

        <h2 className="text-[26px] md:text-[44px] lg:col-start-2 lg:col-end-7 lg:row-start-2 xxl:text-[64px]">
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

        <p className="text-[14px] md:w-[496px] md:text-[16px] lg:col-start-8 lg:col-end-12 lg:row-start-2 lg:w-[370px] xxl:col-start-9 xxl:w-[450px] xxl:text-[18px]">
          Conexão entre talentos e projetos de forma ágil, permitindo equipes
          flexíveis e produtivas.
        </p>
      </div>

      {/* cards */}
      <div className="mt-10 grid grid-cols-4 gap-4 md:mt-16 md:grid-cols-6 lg:mt-12 lg:grid-cols-12 lg:gap-3 xl:mt-16 xl:gap-5 xxl:mt-[88px]">
        {/* Card Projetos que ganham equipe */}
        <div className="col-span-4 h-56 rounded-[44px] bg-[url('https://res.cloudinary.com/daxa1bpny/image/upload/v1763427408/ui_assets/BgCardAboutUs.jpg')] bg-cover bg-center bg-no-repeat p-[23px] md:col-span-6 md:p-[23px] lg:col-start-2 lg:col-end-7 lg:row-span-2 lg:h-[382px] lg:p-7 xl:h-[441px] xl:p-8 xxl:h-[583px] xxl:p-11">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center self-end rounded bg-white/20 px-3 py-1 backdrop-blur-md xl:h-9 xxl:h-[54px] xxl:w-[250px]">
              <Image
                src="https://res.cloudinary.com/daxa1bpny/image/upload/v1763427446/ui_assets/icon_colab.svg"
                alt="ColabWork"
                width={18}
                height={18}
                className="mr-2 xxl:h-8! xxl:w-8!"
              />
              <p className="text-[16px] font-medium text-white xxl:text-[32px]">
                ColabWork
              </p>
            </div>

            <div className="flex h-[82px] items-center justify-center self-center rounded-md bg-white/20 px-4 py-2 backdrop-blur-xl md:h-[98px] md:w-[708px] md:justify-between lg:h-[105px] lg:w-[394px] xl:h-[120px] xl:w-[457px] xl:px-8 xxl:h-[168px] xxl:w-[633px]">
              <h3 className="mr-2 text-[20px] font-medium text-white sm:text-[24px] md:text-[32px] lg:w-[261px] lg:text-[32px] xl:w-[293px] xl:text-[36px] xxl:w-[423px] xxl:text-[52px]">
                Projetos que ganham equipe
              </h3>

              <div className="flex h-[39px] w-[39px] items-center justify-center rounded-full bg-white p-2 xxl:h-20 xxl:w-20">
                <Users className="h-5 w-5 text-primary-default xxl:h-10 xxl:w-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Card Conecte talentos certos */}
        <div className="col-span-4 flex h-[142px] items-center justify-center rounded-[44px] bg-[#EAEAF2] p-5 md:col-span-3 md:h-[188px] md:p-[23px] lg:col-start-7 lg:col-end-12 lg:h-[181px] lg:p-7 xl:h-[210px] xl:p-8 xxl:h-[279px] xxl:p-11">
          <div>
            <h3 className="text-[24px] text-[#3B38A0] md:text-[32px] xl:text-[36px] xxl:text-[52px]">
              Conecte talentos certos
            </h3>
            <div className="mt-[26px] flex items-center justify-between rounded-[14px] bg-white px-[17px] py-[11px] md:px-[21px] md:py-3.5 lg:h-[62px] xl:h-[72px] xxl:mt-[49px] xxl:h-[100px]">
              <p className="text-[16px] leading-[140%] md:text-[20px] xxl:text-[32px]">
                Equipe sob medida
              </p>
              <ChartNoAxesColumnIncreasing className="h-[29px] w-[29px] text-[#3B38A0] xxl:h-14 xxl:w-14" />
            </div>
          </div>
        </div>

        {/* Card da ideia até a entrega final */}
        <div className="col-span-4 flex h-[142px] items-end justify-end rounded-[44px] bg-primary-light p-5 md:col-span-3 md:h-[188px] md:p-[23px] lg:col-start-7 lg:col-end-12 lg:px-7 lg:pt-0 lg:pb-7 xl:h-[210px] xxl:h-[284px] xxl:px-11">
          <div className="flex justify-between rounded-3xl">
            <p className="text-[24px] leading-6 font-medium text-[#3B38A0] md:text-[26px] lg:text-[36px] lg:leading-8 xl:pr-20 xxl:text-[52px] xxl:leading-12">
              Da ideia até a entrega final
            </p>
            <SquarePen className="h-10 w-10 text-[#3B38A0] lg:h-15 lg:w-15 xxl:h-28 xxl:w-28" />
          </div>
        </div>

        {/* Card nossa proposta */}
        <div className="col-span-4 flex h-[235px] items-center rounded-[44px] bg-[#A1A0D1] bg-cover bg-center p-[26px] md:col-span-6 md:h-64 md:bg-[url('/BgNossaProposta.svg')] md:p-0 md:pl-10 lg:col-start-2 lg:col-end-12 lg:h-[272px] lg:px-12 lg:py-0 xl:h-[316px] xl:px-[34px] xxl:h-[434px] xxl:px-[77px]">
          <div className="flex flex-col justify-center md:w-[390px] xl:w-[551px] xxl:w-[750px]">
            <p className="h-3 text-[12px] text-white lg:text-[14px] xxl:text-[16px]">
              Nossa proposta
            </p>
            <h3 className="md::mt-4 mt-[9px] text-[18px] font-medium text-white sm:text-[24px] md:text-[32px] lg:mt-5 xl:text-[36px] xxl:mt-10 xxl:text-[52px]">
              Uma rede simples para unir pessoas e projetos
            </h3>
            <p className="md::mt-4 mt-[11px] text-[14px] text-white lg:mt-5 xxl:mt-10">
              Criamos uma comunidade onde desenvolvedores, designers e QA se
              conectam com empresas ou pessoas que precisam de soluções.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
