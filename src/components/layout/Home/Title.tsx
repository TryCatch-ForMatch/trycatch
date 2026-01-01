'use client';

import Image from 'next/image';

export default function Title() {
  return (
    <h1 className="relative text-center text-[30px] leading-[120%] font-semibold sm:text-[38px] md:text-[48px] xl:text-[56px] xxl:text-[72px]">
      {/* Linha 1 */}
      <span className="relative inline-block">
        Conectando
        <Image
          src="/shineIcon.svg"
          alt=""
          aria-hidden
          width={27}
          height={26}
          className="pointer-events-none absolute right-[96%] bottom-[60%] md:right-[98%] md:bottom-[52%] md:h-[44px] md:w-[43px] xl:h-[52px] xl:w-[51px]"
        />
      </span>

      <br />

      {/* Linha 2 */}
      <span className="inline-block">talentos a projetos reais,</span>

      <br />

      {/* Linha 3 */}
      <span className="relative inline-block">
        juntos
        <Image
          src="/star.svg"
          alt=""
          aria-hidden
          width={21}
          height={21}
          className="pointer-events-none absolute bottom-[60%] left-full xxl:h-[25px] xxl:w-[25px]"
        />
        <Image
          src="/stroke.svg"
          alt=""
          aria-hidden
          width={97}
          height={13}
          className="pointer-events-none absolute top-full left-[10%] md:h-[16px] md:w-[116px] xl:w-[135px] xxl:h-[25px] xxl:w-[182px]"
        />
      </span>
    </h1>
  );
}
