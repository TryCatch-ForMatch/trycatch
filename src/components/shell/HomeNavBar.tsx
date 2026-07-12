'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { MenuItem } from './menuItem';
import { motion, AnimatePresence } from 'motion/react';

export function HomeNavBar() {
  const [openMobile, setOpenMobile] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (openMobile) {
      const firstLink = menuRef.current?.querySelector('a, button');
      (firstLink as HTMLElement | null)?.focus();
    } else {
      buttonRef.current?.focus();
    }
  }, [openMobile]);

  useEffect(() => {
    if (!openMobile) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMobile(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openMobile]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/20 bg-secondary transition-all duration-300">
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
            {MenuItem.map((menu) => (
              <li key={menu.label}>
                <Link href={menu.href} onClick={() => setOpenMobile(false)}>
                  {menu.href !== '/contact' && menu.label}
                </Link>

                {menu.href === '/contact' && (
                  <Button className="transition-color rounded-full bg-[#35343C]">
                    <Link href="/contact">Entre em contato</Link>
                  </Button>
                )}
              </li>
            ))}
          </ul>

          <button
            ref={buttonRef}
            className="cursor-pointer p-2 lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={openMobile}
            aria-controls="mobile-menu"
            onClick={() => setOpenMobile(!openMobile)}
          >
            <Image src="/menuBurguer.svg" alt="" width={20} height={20} />
          </button>
        </div>

        <AnimatePresence>
          {openMobile && (
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              role="navigation"
              initial={{
                opacity: 0,
                y: -20,
                scaleY: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scaleY: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scaleY: 0.95,
              }}
              transition={{
                duration: 0.25,
                ease: 'easeInOut',
              }}
              className="absolute top-full left-0 w-full origin-top rounded-b-2xl border-b border-gray-400/10 bg-secondary backdrop-blur-3xl lg:hidden"
            >
              <ul className="flex flex-col gap-4 px-6 py-6 text-lg">
                {MenuItem.map((menu) => (
                  <li key={menu.label}>
                    <Link href={menu.href} onClick={() => setOpenMobile(false)}>
                      {menu.href !== '/contact' && menu.label}
                    </Link>

                    {menu.href === '/contact' && (
                      <Button
                        onClick={() => setOpenMobile(false)}
                        className="w-full rounded-full bg-[#35343C]"
                      >
                        <Link href="/contact">Entre em contato</Link>
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
