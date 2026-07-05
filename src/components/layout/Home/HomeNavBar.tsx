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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-400/10 bg-secondary backdrop-blur-xl transition-all duration-300">
      <nav className="relative flex items-center">
        <div className="mx-12 flex w-full items-center justify-between">
          <Link href="/" aria-label="Ir para página inicial">
            <div
              className={`relative flex items-center justify-center transition-all duration-300`}
            >
              <Image
                src="/logo-trycatch-poppins-transparente.png"
                alt="TryCatch"
                width={180}
                height={100}
                className="object-cover"
              />
            </div>
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                Início
              </Link>
            </li>
            <li>
              <Link href="/#aboutUs" onClick={() => setOpen(false)}>
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/portfolios" onClick={() => setOpen(false)}>
                Portfolios
              </Link>
            </li>
            <li>
              <Link href="/#FAQ" onClick={() => setOpen(false)}>
                Dúvidas
              </Link>
            </li>
            <li>
              <Button
                asChild
                className="rounded-full bg-[#35343C] hover:bg-[#35343C]/90"
              >
                <Link href="/contact">Entre em contato</Link>
              </Button>
            </li>
          </ul>

          {/* MOBILE BUTTON */}
          <button
            ref={buttonRef}
            className="cursor-pointer p-2 lg:hidden"
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
            className="absolute top-full left-0 w-full rounded-b-2xl border-b border-gray-400/10 bg-secondary backdrop-blur-3xl lg:hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6 text-lg">
              <li onClick={() => setOpen(false)}>
                <Link href="/">Início</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link href="/#aboutUs">Sobre</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link href="/portfolios">Portfolios</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link href="/#FAQ">Dúvidas</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Button
                  asChild
                  className="mt-2 rounded-full bg-[#35343C] hover:bg-[#35343C]/90"
                >
                  <Link href="/contact">Entre em contato</Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
