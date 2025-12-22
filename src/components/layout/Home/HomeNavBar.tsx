'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function HomeNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'h-12 bg-white/80 shadow-sm backdrop-blur-md'
          : 'h-20 bg-transparent'
      } `}
    >
      {/* BAR */}
      <div className="flex h-full items-center justify-center">
        <div className="mx-[20px] flex w-full max-w-[335px] items-center justify-between md:mx-[28px] md:max-w-[968px] lg:mx-[34px] lg:max-w-[1152px] xl:mx-[80px] xl:max-w-[1360px] xxl:mx-[80px] xxl:max-w-[1842px]">
          <p className="font-bold">TryCatch</p>

          {/* DESKTOP */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>
                <Link href="#aboutUs">Sobre</Link>
              </li>
              <li>
                <Link href="/portfolios">Portfolios</Link>
              </li>
              <li>
                <Link href="/">Dúvidas</Link>
              </li>
              <li>
                <Button
                  asChild
                  className="rounded-full bg-[#35343C] hover:bg-[#35343C]/90"
                >
                  <Link href="/">Fale com um Dev</Link>
                </Button>
              </li>
            </ul>
          </nav>

          {/* MOBILE BUTTON */}
          <button className="p-2 lg:hidden" onClick={() => setOpen(!open)}>
            <Image src="/menuBurguer.svg" alt="menu" width={20} height={20} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <nav className="absolute top-full left-0 w-full bg-white/95 shadow-md backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-4 px-6 py-6 text-lg">
            <li onClick={() => setOpen(false)}>
              <Link href="/">Início</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href="#aboutUs">Sobre</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href="/portfolios">Portfolios</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href="/">Dúvidas</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Button
                asChild
                className="mt-2 rounded-full bg-[#35343C] hover:bg-[#35343C]/90"
              >
                <Link href="/">Fale com um Dev</Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
