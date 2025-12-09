'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-16 md:mt-28 lg:mt-[121px] xl:mt-[145px] xxl:mt-[202px]">
      <div className="flex flex-col justify-between gap-12 lg:flex-row xxl:gap-0">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex h-[89px] w-[214px] items-center justify-center rounded-2xl border border-[#35343C]">
            <span className="text-[16px] font-medium text-gray-800">Logo</span>
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
            <Link href="/">
              <li>
                <p className="hover:text-gray-800">Dúvidas</p>
              </li>
            </Link>
          </ul>
        </div>

        <div className="ml-auto flex flex-col md:ml-0 lg:w-[419px] xxl:lg:w-[534px]">
          <h4 className="text-[16px] font-medium text-[#35343C] md:text-[18px]">
            Entre em contato
          </h4>
          <p className="mt-4 text-[14px] leading-[140%] text-[#5C5C65] md:mt-3 md:text-[16px] xxl:text-[18px]">
            Conta sua ideia ou dúvida pra gente.
          </p>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 md:flex-row xxl:gap-4">
            <input
              type="email"
              placeholder="Escrever e-mail..."
              className="h-[54px] w-[335px] rounded-[99px] border border-[#35343C] px-5 py-6 text-[14px] focus:border-gray-500 focus:outline-none md:text-[16px] lg:w-full xl:h-14 xl:w-[309px] xxl:h-[70px] xxl:w-[400px] xxl:text-[18px]"
            />
            <button className="flex h-[54px] w-[335px] items-center justify-center rounded-[99px] bg-[#35343C] px-5 py-6 text-[14px] text-white hover:bg-gray-700 md:h-14 md:w-auto md:text-[16px] lg:w-auto xxl:h-[70px] xxl:w-[118px] xxl:text-[18px]">
      
              Enviar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#EAEAEB] pt-12 text-[14px] text-[#5C5C65] md:mt-22 md:flex-row md:pt-10 md:text-[16px] lg:flex-row xxl:text-[18px]">
        <p>© 2025 Try Catch For Match. All rights reserved</p>
        <Link href="https://eduardopaiva.framer.ai/">
          <p>Design by Eduardo Paiva</p>
        </Link>
      </div>
    </footer>
  );
}
