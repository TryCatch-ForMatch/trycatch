'use client';
import Image from 'next/image';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

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
      className={`sticky top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-[20px] mt-[20px] flex h-[28px] max-w-[335px] items-center justify-between md:mx-[28px] md:max-w-[754px] lg:mx-[34px] lg:h-[41px] lg:max-w-[1084px] xl:mx-[80px] xl:h-[48px] xl:max-w-[1360px] xxl:mx-[80px] xxl:h-[58px] xxl:max-w-[1760px]">
        {/* LOGO */}
        <div>
          <p className="font-bold">TryCatch</p>
        </div>

        {/* DESKTOP MENU (lg+) */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/">
                <p>Início</p>
              </Link>
            </li>
            <li>
              <Link href="#aboutUs">
                <p>Sobre</p>
              </Link>
            </li>
            <li>
              <Link href="/portfolios">
                <p>Portfolios</p>
              </Link>
            </li>
            <li>
              <Link href="/">
                <p>Dúvidas</p>
              </Link>
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

        {/* MOBILE BURGER BUTTON (sm e md) */}
        <button
          className="flex items-center justify-center p-2 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <Image
            src="/menuBurguer.svg"
            alt="menu"
            width={20}
            height={20}
            className={
              open
                ? 'rotate-45 transition-transform duration-200'
                : 'transition-transform duration-200'
            }
          />
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {open && (
        <nav className="animate-fadeIn mb-5 bg-white/95 px-6 py-6 shadow-md backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-4 text-lg">
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
