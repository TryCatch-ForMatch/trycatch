'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-16 md:mt-28 lg:mt-[121px] xl:mt-[145px] xxl:mt-[202px]">
      <div className="flex flex-col justify-between gap-12 lg:flex-row xxl:gap-0">
        <div className="flex flex-col gap-4 md:gap-5">
          <div className="relative h-10 w-32">
            <Image
              src="/logo-trycatch-colmeia.png"
              alt="TryCatch"
              fill
              className="object-contain"
            />
          </div>

          <p className="text-[14px] text-[#5C5C65] md:w-[367px] md:text-[16px] lg:w-[261px] xxl:w-[421px] xxl:text-[18px]">
            Uma rede que conecta projetos e profissionais para criar soluções
            digitais.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-3 lg:justify-end xxl:ml-[74px]">
          <h4 className="text-[16px] leading-[140%] font-medium text-gray-800 lg:text-[18px]">
            Navegue
          </h4>
          <ul className="flex flex-col gap-3 text-[14px] leading-[140%] text-[#5C5C65] md:flex-row md:justify-between md:text-[16px] xxl:text-[18px]">
            <Link href="/">
              <li className="lg:mr-7 xl:mr-15">
                <p className="hover:text-gray-800">Início</p>
              </li>
            </Link>

            <Link href="#aboutUs">
              <li className="lg:mr-7 xl:mr-15">
                <p className="hover:text-gray-800">Sobre</p>
              </li>
            </Link>
            <Link href="/portfolios">
              <li className="lg:mr-7 xl:mr-15">
                <p className="hover:text-gray-800">Portfólios</p>
              </li>
            </Link>
            <Link href="#FAQ">
              <li>
                <p className="hover:text-gray-800">Dúvidas</p>
              </li>
            </Link>
          </ul>
        </div>

        <div className="flex flex-col md:ml-0 lg:ml-auto lg:w-[419px] xxl:lg:w-[534px]">
          <h4 className="text-[16px] font-medium text-[#35343C] md:text-[18px]">
            Entre em contato
          </h4>
          <p className="mt-4 text-[14px] leading-[140%] text-[#5C5C65] md:mt-3 md:text-[16px] xxl:text-[18px]">
            Conta sua ideia ou dúvida pra gente.
          </p>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 md:flex-row md:justify-normal xxl:gap-4">
            <input
              type="email"
              placeholder="Escrever e-mail..."
              className="h-[54px] min-w-[280px] rounded-[99px] border border-[#35343C] px-5 py-6 text-[14px] focus:border-gray-500 focus:outline-none sm:w-full sm:max-w-[385px] sm:min-w-[335px] md:w-[309px] md:min-w-[309px] md:text-[16px] lg:w-full xl:h-14 xl:w-[309px] xxl:h-[70px] xxl:w-[400px] xxl:text-[18px]"
            />
            <button className="flex h-[54px] min-w-[280px] items-center justify-center rounded-[99px] bg-[#35343C] px-5 py-6 text-[14px] text-white hover:bg-gray-700 sm:w-full sm:max-w-[385px] sm:min-w-[335px] md:h-14 md:w-[98px] md:min-w-[98px] md:text-[16px] lg:w-auto xxl:h-[70px] xxl:w-[118px] xxl:text-[18px]">
              Enviar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#EAEAEB] pt-12 text-[14px] text-[#5C5C65] md:mt-22 md:flex-row md:pt-10 md:text-[16px] lg:flex-row xxl:text-[18px]">
        <p>© 2025 TryCatch® 4Match. All rights reserved</p>
        <Link href="https://eduardopaiva.framer.ai/">
          <p>Design by Eduardo Paiva</p>
        </Link>
      </div>
    </footer>
  );
}
