import Image from 'next/image';
import { Users, ChartNoAxesColumnIncreasing, SquarePen } from 'lucide-react';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <section
      id="aboutUs"
      className="mt-12 md:mt-20 lg:mt-15 xl:mt-26 xxl:mt-32"
    >
      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-2">
        <h2 className="mt-4 text-[26px] leading-[120%] font-medium text-[#35343C] md:text-[44px] lg:col-start-2 lg:col-end-7 lg:row-start-2 xxl:text-[64px]">
          Sobre nossa rede
          <span className="flex items-center">
            <Image
              src="https://res.cloudinary.com/daxa1bpny/image/upload/v1763427512/ui_assets/IconsAboutUs.svg"
              alt="icones"
              width={66}
              height={29}
              priority
              className="mr-2 lg:h-[34px] lg:w-20!"
            />
            colaborativa
          </span>
        </h2>
        <p className="mt-[18px] text-[14px] leading-[140%] text-[#5C5C65] md:w-[496px] md:text-[16px] lg:col-start-8 lg:col-end-12 lg:row-start-2 lg:w-full xl:col-start-9 xxl:ml-20 xxl:w-[368px] xxl:text-[18px]">
          Conectamos talentos a projetos reais em um ambiente colaborativo, com
          aprendizado prático e troca de conhecimento entre diferentes níveis de
          experiência.
        </p>
      </div>

      {/* cards */}
      <div className="mt-10 grid grid-cols-4 gap-4 md:mt-16 md:grid-cols-6 lg:mt-12 lg:grid-cols-12 lg:gap-5 xl:mt-16 xl:gap-5 xxl:mt-[88px]">
        {/* Card Projetos que ganham equipe */}
        <div className="col-span-4 h-56 rounded-2xl bg-[url('https://res.cloudinary.com/daxa1bpny/image/upload/v1763427408/ui_assets/BgCardAboutUs.jpg')] bg-cover bg-center bg-no-repeat p-[23px] md:col-span-6 md:p-[23px] lg:col-start-2 lg:col-end-7 lg:row-span-2 lg:h-auto lg:rounded-[28px] lg:p-7 xl:p-8 xxl:p-11">
          <div className="flex h-full flex-col justify-between">
            <div className="flex h-[30px] w-[131px] items-center gap-1.5 self-end rounded-[6px] bg-white/20 px-[9px] py-1.5 backdrop-blur-md md:w-[156px] md:gap-2 lg:h-[33px] lg:w-[158px] lg:px-2.5 lg:py-[7px] xl:h-9 xl:w-[164px] xl:px-3 xl:py-2 xxl:h-[54px] xxl:w-[250px] xxl:px-[17px] xxl:py-[11px]">
              <Image
                src="https://res.cloudinary.com/daxa1bpny/image/upload/v1763427446/ui_assets/icon_colab.svg"
                alt="ColabWork"
                width={18}
                height={18}
                className="xl:h-5! xl:w-5! xxl:h-8! xxl:w-8!"
              />
              <p className="text-[16px] font-medium text-white md:text-[20px] xxl:text-[32px]">
                ColabWork
              </p>
            </div>

            <Link
              href="about/#projetos"
              className="flex h-[82px] max-w-[289px] items-center justify-center gap-2.5 self-center rounded-[12px] bg-white/20 px-[23px] py-[17px] backdrop-blur-xl md:h-[98px] md:w-full md:max-w-[708px] md:justify-between lg:h-[105px] lg:w-[394px] lg:gap-[30px] xl:h-[120px] xl:w-[457px] xl:p-8 xxl:h-[168px] xxl:w-[633px] xxl:px-11 xxl:py-8"
            >
              <h3 className="text-[16px] font-medium text-white sm:text-[24px] md:w-[261px] md:text-[32px] lg:w-[261px] xl:w-[293px] xl:text-[36px] xxl:w-[423px] xxl:text-[52px]">
                Projetos que ganham equipe
              </h3>

              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white p-2 lg:h-[46px] lg:w-[46px] xl:h-[54px] xl:w-[54px] xxl:h-20 xxl:w-20">
                <Users className="h-5 w-5 text-primary-default xl:h-[27px] xl:w-[27px] xxl:h-[37px] xxl:w-[37px]" />
              </div>
            </Link>
          </div>
        </div>

        {/* Card Conecte talentos certos */}
        <Link
          href="about/#equipes"
          className="col-span-4 flex h-[142px] max-w-[335px] justify-center rounded-2xl bg-[#EAEAF2] p-5 md:col-start-1 md:col-end-4 md:h-[187px] md:max-w-full md:p-[23px] lg:col-start-7 lg:col-end-12 lg:h-[181px] lg:w-auto lg:justify-center lg:rounded-[28px] lg:p-7 xl:h-[210px] xl:p-8 xxl:h-[289px] xxl:p-11"
        >
          <div className="flex flex-col sm:justify-between">
            <h3 className="text-[18px] font-medium text-[#3B38A0] sm:text-[24px] md:text-[32px] xl:text-[36px] xxl:text-[52px]">
              Colaboração por habilidades
            </h3>
            <div className="center mt-[27px] flex items-center justify-between rounded-[14px] bg-white px-[17px] py-[11px] lg:px-[21px] lg:py-3.5 xl:h-[72px] xl:px-6 xl:py-4 xxl:h-[100px] xxl:px-[33] xxl:py-[22px]">
              <p className="text-[14px] leading-[140%] text-[#5C5C65] sm:text-[16px] md:text-[20px] xxl:text-[32px]">
                Equipe sob medida
              </p>
              <ChartNoAxesColumnIncreasing className="ml-2 h-7 w-7 text-[#3B38A0] sm:ml-0 lg:h-[34px] lg:w-[34px] xl:h-10 xl:w-10 xxl:h-14 xxl:w-14" />
            </div>
          </div>
        </Link>

        {/* Card da ideia até a entrega final */}
        <Link
          href="about/#entrega"
          className="col-span-4 flex h-[142px] max-w-[335px] flex-col justify-end rounded-2xl bg-[#D9D9ED] p-5 md:col-start-4 md:col-end-7 md:h-[187px] md:max-w-full md:p-[23px] md:pt-0 lg:col-start-7 lg:col-end-12 lg:h-[181px] lg:w-auto lg:rounded-[28px] lg:px-7 lg:pt-0 lg:pb-7 xl:h-[210px] xl:px-8 xl:pb-8 xxl:h-[289px] xxl:px-11 xxl:pb-11"
        >
          <div className="flex items-end justify-between">
            <p className="h-12 w-[175px] text-[24px] leading-6 font-medium text-[#3B38A0] md:w-48 md:text-[26px] lg:h-16 lg:w-[233px] lg:text-[32px] lg:leading-8 xl:w-[262px] xl:text-[36px] xxl:h-[104px] xxl:w-[379px] xxl:text-[52px] xxl:leading-12">
              Da ideia até a entrega final
            </p>
            <SquarePen className="h-7 w-7 text-[#3B38A0] lg:h-[34px] lg:w-[34px] xl:h-10 xl:w-10 xxl:h-14 xxl:w-14" />
          </div>
        </Link>

        {/* Card nossa proposta */}
        <div className="col-span-4 flex h-[235px] max-w-[335px] items-center rounded-2xl bg-[#A1A0D1] bg-cover bg-center p-[26px] md:col-span-6 md:h-64 md:max-w-full md:bg-[url('/BgNossaProposta.svg')] md:p-0 md:pl-10 lg:col-start-2 lg:col-end-12 lg:h-[272px] lg:rounded-[28px] lg:px-12 lg:py-0 xl:h-[316px] xl:px-[34px] xxl:h-[435px] xxl:px-[77px]">
          <div className="lg:[h-168px] flex w-[283px] flex-col justify-center lg:w-[474px] xl:w-[551px] xxl:w-[750px]">
            <p className="text-[12px] font-medium text-white lg:text-[14px] xxl:text-[16px]">
              Nossa proposta
            </p>
            <h3 className="mt-[9px] text-[18px] font-medium text-white sm:text-[24px] md:w-[350px] md:text-[32px] md:leading-10 lg:hidden">
              Uma rede simples para unir pessoas e projetos
            </h3>
            <h3 className="mt-2.5 hidden w-[485px] text-[32px] font-medium text-white lg:block xl:mt-3 xl:w-[523px] xl:text-[36px] xxl:mt-4 xxl:w-[750px] xxl:text-[52px]">
              Uma rede simples <br /> para unir pessoas e projetos
            </h3>
            <p className="mt-[11px] text-[14px] leading-[140%] text-white md:mt-4 md:w-[400px] lg:mt-3.5 lg:w-[474px] lg:text-[16px] xl:mt-4 xl:w-[551px] xxl:mt-6 xxl:w-[750px]">
              Construímos uma rede colaborativa onde diferentes áreas se
              conectam em projetos reais para desenvolver soluções digitais
              junto a empresas ou iniciativas independentes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
