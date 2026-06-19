'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-16 pb-6 md:mt-28 lg:mt-[121px] xl:mt-[145px] xxl:mt-[202px]">
      <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-12 border-t border-[#EAEAEB] pt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-24">
          {/* Marca */}
          <div>
            <div className="flex max-w-[320px] flex-col items-center text-center">
              <div className="relative mb-5 h-20 w-52">
                <Image
                  src="/logo-trycatch-colmeia.png"
                  alt="TryCatch"
                  fill
                  className="object-contain"
                />
              </div>

              <p className="text-[16px] leading-[160%] text-[#5C5C65] md:text-[18px] xxl:text-[20px]">
                Transformando aprendizado em experiência prática.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-24">
            {/* Navegação */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[16px] font-medium text-[#35343C] md:text-[18px]">
                Navegue
              </h4>

              <ul className="flex flex-col gap-2 text-[14px] text-[#5C5C65] md:text-[16px]">
                <li>
                  <Link href="/" className="hover:text-[#35343C]">
                    Início
                  </Link>
                </li>

                <li>
                  <Link href="#aboutUs" className="hover:text-[#35343C]">
                    Sobre
                  </Link>
                </li>

                <li>
                  <Link href="/portfolios" className="hover:text-[#35343C]">
                    Portfólios
                  </Link>
                </li>

                <li>
                  <Link href="#FAQ" className="hover:text-[#35343C]">
                    Dúvidas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Comunidade */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[16px] font-medium text-[#35343C] md:text-[18px]">
                Contato
              </h4>

              <ul className="flex flex-col gap-2 text-[14px] text-[#5C5C65] md:text-[16px]">
                <li>
                  <Link
                    href="https://www.linkedin.com/company/trycatch-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#35343C]"
                  >
                    LinkedIn
                  </Link>
                </li>

                <li>
                  <Link href="/contact" className="hover:text-[#35343C]">
                    Fale Conosco
                  </Link>
                </li>
              </ul>
            </div>

            {/* Institucional */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[16px] font-medium text-[#35343C] md:text-[18px]">
                Institucional
              </h4>

              <ul className="flex flex-col gap-2 text-[14px] text-[#5C5C65] md:text-[16px]">
                <li>
                  <Link href="/privacy" className="hover:text-[#35343C]">
                    Política de Privacidade
                  </Link>
                </li>

                <li>
                  <Link href="/terms" className="hover:text-[#35343C]">
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#EAEAEB] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] text-[#5C5C65] md:text-[16px]">
            © 2025 TryCatch® 4Match. Todos os direitos reservados.
          </p>

          <Link
            href="https://eduardopaiva.framer.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-[#5C5C65] hover:text-[#35343C] md:text-[16px]"
          >
            Design by Eduardo Paiva
          </Link>
        </div>
      </div>
    </footer>
  );
}
