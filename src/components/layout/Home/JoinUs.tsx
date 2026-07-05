'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function JoinUs() {
  return (
    <section className="mt-[65px] md:mt-[113px] lg:mt-[121px] xl:mt-[136px] xxl:mt-[201px]">
      <div className="h-[286px] w-full rounded-[18px] bg-[url('https://res.cloudinary.com/daxa1bpny/image/upload/v1764801280/ui_assets/bg_joinUs_tablet.svg')] bg-cover bg-no-repeat px-[22px] py-[58px] md:h-[300px] md:px-[165px] md:py-10 lg:h-[261px] lg:bg-[url('https://res.cloudinary.com/daxa1bpny/image/upload/v1764805503/ui_assets/bg_joinUs_desktop.svg')] lg:bg-right lg:pt-16 lg:pr-[107px] lg:pb-[43px] lg:pl-[72px] xl:h-[309px] xl:pt-[76px] xl:pr-[90px] xl:pb-[74px] xxl:h-[400px] xxl:pt-[98px] xxl:pr-[183px] xxl:pb-[92px] xxl:pl-[110px]">
        <div className="flex flex-col gap-5">
          <h3 className="w-[291px] text-[26px] leading-[120%] font-medium text-[#35343C] md:col-span-6 md:w-[424px] md:text-[44px] lg:col-span-12 lg:w-[671px] lg:text-left xxl:w-[975px] xxl:text-[64px]">
            Participe da nossa rede agora
          </h3>
          <p className="text-center text-[14px] leading-[140%] text-[#5C5C65] md:col-span-6 md:text-[16px] lg:col-span-12 lg:w-[671px] lg:text-left xxl:mt-4 xxl:w-[975px] xxl:text-[18px]">
            Cadastre seu projeto ou junte-se à comunidade e colabore em novas
            ideias.
          </p>
          <Link href="/how-to-join" className="justify-self-center">
            <Button className="h-[31px] w-[140px] rounded-[42px] bg-[#35343C] hover:bg-[#35343C]/90 md:h-[34px] md:w-[155px] lg:h-[43px] lg:w-[170px] xl:h-12 xl:w-[177px] xxl:mt-8 xxl:h-[59px] xxl:w-[207px]">
              <span className="px-[13px] py-[9px] text-[14px] md:text-[16px] lg:px-5 lg:py-3.5 xl:px-6 xl:py-4 xxl:px-[31px] xxl:py-[21px] xxl:text-[18px]">
                Começar
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
