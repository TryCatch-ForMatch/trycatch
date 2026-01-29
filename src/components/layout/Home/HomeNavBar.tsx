'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

export function HomeNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Referência ao botão do menu mobile (controle de foco)
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Referência ao container do menu mobile (controle de foco e navegação)
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Move o foco para o menu ao abrir e retorna para o botão ao fechar (acessibilidade)
  useEffect(() => {
    if (open) {
      const firstLink = menuRef.current?.querySelector('a, button');
      (firstLink as HTMLElement | null)?.focus();
    } else {
      buttonRef.current?.focus();
    }
  }, [open]);

  // Permite fechar o menu mobile ao pressionar ESC (navegação por teclado)
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Detecta scroll para alterar o estilo da navbar
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
      }`}
    >
      <nav className="relative flex h-full items-center justify-center">
        <div className="mx-[20px] flex w-full max-w-[335px] items-center justify-between md:mx-[28px] md:max-w-[968px] lg:mx-[34px] lg:max-w-[1152px] xl:mx-[80px] xl:max-w-[1360px] xxl:mx-[80px] xxl:max-w-[1842px]">
          <Link href="/" aria-label="Ir para página inicial">
            <div
              className={`relative flex items-center justify-center transition-all duration-300 ${
                scrolled ? 'h-8 w-24' : 'h-28 w-46'
              }`}
            >
              <Image
                src="/logo-trycatch-poppins-transparente.png"
                alt="TryCatch"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP */}
          <ul className="hidden items-center gap-6 lg:flex">
            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                Início
              </Link>
            </li>
            <li>
              <Link href="#aboutUs" onClick={() => setOpen(false)}>
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/portfolios" onClick={() => setOpen(false)}>
                Portfolios
              </Link>
            </li>
            <li>
              <Link href="#FAQ" onClick={() => setOpen(false)}>
                Dúvidas
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

          {/* MOBILE BUTTON */}
          <button
            ref={buttonRef}
            className="p-2 lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <Image src="/menuBurguer.svg" alt="" width={20} height={20} />
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div
            ref={menuRef}
            id="mobile-menu"
            role="navigation"
            className="absolute top-full left-0 w-full bg-white/95 shadow-md backdrop-blur-md lg:hidden"
          >
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
          </div>
        )}
      </nav>
    </header>
  );
}
