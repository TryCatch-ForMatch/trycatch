import Link from 'next/link';
import Image from 'next/image';

interface FooterLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: 'Navegue',
    links: [
      { href: '/', label: 'Início' },
      { href: '/#aboutUs', label: 'Sobre' },
      { href: '/portfolios', label: 'Portfólios' },
      { href: '/#FAQ', label: 'Dúvidas' },
    ],
  },
  {
    title: 'Contato',
    links: [
      {
        href: 'https://www.linkedin.com/company/trycatch-app',
        label: 'LinkedIn',
        isExternal: true,
      },
      { href: '/contact', label: 'Fale Conosco' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { href: '/privacy', label: 'Política de Privacidade' },
      { href: '/terms', label: 'Termos de Uso' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 pb-6 md:mt-28 lg:mt-[121px] xl:mt-[145px] xxl:mt-[202px]">
      <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-12 border-t border-gray-100 pt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-24">
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

              <p className="text-[16px] leading-[160%] text-gray-300 md:text-[18px] xxl:text-[20px]">
                Transformando aprendizado em experiência prática.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-24">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <h4 className="text-[16px] font-medium text-gray-400 md:text-[18px]">
                  {column.title}
                </h4>

                <ul className="flex flex-col gap-2 text-[14px] text-gray-300 md:text-[16px]">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        {...(link.isExternal && {
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        })}
                        className="hover:text-gray-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-gray-100 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] text-gray-300 md:text-[16px]">
            © 2025 TryCatch® 4Match. Todos os direitos reservados.
          </p>

          <Link
            href="https://eduardopaiva.framer.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-gray-300 hover:text-gray-400 md:text-[16px]"
          >
            Design by Eduardo Paiva
          </Link>
        </div>
      </div>
    </footer>
  );
}