import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function JoinUs() {
  return (
    <section className="mt-[65px] md:mt-[113px] lg:mt-[121px] xl:mt-[136px] xxl:mt-[201px]">
      <div className="h-[286px] rounded-[18px] bg-[url('https://res.cloudinary.com/daxa1bpny/image/upload/v1764801280/ui_assets/bg_joinUs_tablet.svg')] bg-no-repeat px-[22px] py-[58px] md:h-[300px] md:px-[165px] md:py-10 lg:h-[261px] lg:bg-[url('https://res.cloudinary.com/daxa1bpny/image/upload/v1764805503/ui_assets/bg_joinUs_desktop.svg')] lg:bg-contain lg:bg-right lg:pt-16 lg:pr-[107px] lg:pb-[43px] lg:pl-[72px] xl:h-[309px] xl:pt-[76px] xl:pr-[90px] xl:pb-[74px] xxl:h-[400px] xxl:pt-[98px] xxl:pr-[183px] xxl:pb-[92px] xxl:pl-[110px]">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
          <h2 className="col-span-4 w-[291px] justify-self-center text-center text-[26px] leading-[120%] font-medium text-gray-400 md:col-span-6 md:w-[424px] md:text-[44px] lg:col-span-12 lg:w-[671px] lg:justify-self-auto lg:text-left xxl:w-[975px] xxl:text-[64px]">
            Faça parte da nossa rede
          </h2>

          <p className="col-span-4 mt-3 text-center text-[14px] leading-[140%] text-gray-300 md:col-span-6 md:text-[16px] lg:col-span-12 lg:w-[671px] lg:text-left xxl:mt-4 xxl:w-[975px] xxl:text-[18px]">
            Cadastre um projeto ou participe da comunidade e colabore em
            projetos reais.
          </p>

          <Button
            asChild
            className="col-start-2 col-end-4 mt-6 h-[31px] w-[140px] justify-self-center rounded-[42px] bg-gray-400 hover:bg-gray-400/90 md:col-start-3 md:col-end-5 md:h-[34px] md:w-[155px] lg:col-span-12 lg:h-[43px] lg:w-[170px] lg:justify-self-auto xl:h-12 xl:w-[177px] xxl:mt-14 xxl:h-[59px] xxl:w-[207px]"
          >
            <Link href="/how-to-join">
              <span className="px-[13px] py-[9px] text-[14px] md:text-[16px] lg:px-5 lg:py-3.5 xl:px-6 xl:py-4 xxl:px-[31px] xxl:py-[21px] xxl:text-[18px]">
                Começar
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
